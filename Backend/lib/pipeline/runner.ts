import { supabase } from "@/lib/supabase";
import { discoverArticles } from "@/lib/discovery/fetch-feeds";
import { DiscoveredArticle } from "@/lib/discovery/sources";
import { evaluateArticle } from "@/lib/editorial/evaluator";
import { generatePost } from "@/lib/editorial/post-generator";

// ──────────────────────────────────────────────
// Pipeline Summary Interface
// ──────────────────────────────────────────────
export interface PipelineSummary {
  success: boolean;
  discovered: number;
  newTopics: number;
  rejected: number;
  published: number;
  agentId: string;
}

// ──────────────────────────────────────────────
// In-Memory Concurrency Lock
// ──────────────────────────────────────────────
const activeRuns = new Set<string>();

export class ConcurrencyError extends Error {
  constructor(agentId: string) {
    super(`Pipeline execution already in progress for agent "${agentId}".`);
    this.name = "ConcurrencyError";
  }
}

// ──────────────────────────────────────────────
// Main Pipeline Execution Function
// ──────────────────────────────────────────────
export async function runAgentPipeline(
  agentId: string
): Promise<PipelineSummary> {
  // Prevent simultaneous pipeline executions for the same agent
  if (activeRuns.has(agentId)) {
    throw new ConcurrencyError(agentId);
  }

  activeRuns.add(agentId);

  try {
    // 1. Fetch agent identity from Supabase
    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", agentId)
      .single();

    if (agentError || !agent) {
      throw new Error(
        `Agent with ID "${agentId}" not found in Supabase: ${
          agentError?.message || "No agent record"
        }`
      );
    }

  // 2. Discover articles from configured RSS sources
  const discoveredArticles = await discoverArticles();
  const totalDiscovered = discoveredArticles.length;

  if (totalDiscovered === 0) {
    return {
      success: true,
      discovered: 0,
      newTopics: 0,
      rejected: 0,
      published: 0,
      agentId,
    };
  }

  // 3. Batch-check existing topics for this agent to prevent duplicates
  const urls = discoveredArticles.map((a) => a.url).filter((u) => u.length > 0);

  const { data: existingTopicRows, error: fetchTopicsError } = await supabase
    .from("topics")
    .select("url")
    .eq("agent_id", agentId)
    .in("url", urls);

  if (fetchTopicsError) {
    console.error("[pipeline] Error checking existing topics:", fetchTopicsError);
  }

  const existingUrlSet = new Set(
    (existingTopicRows || []).map((row: { url: string }) => row.url)
  );

  const newArticles: DiscoveredArticle[] = discoveredArticles.filter(
    (article) => article.url.length > 0 && !existingUrlSet.has(article.url)
  );

  let newTopicsCount = 0;
  let rejectedCount = 0;
  let publishedCount = 0;

  // 4. Process each genuinely new article sequentially
  for (const article of newArticles) {
    // 4a. Save topic into Supabase with initial "discovered" status
    const { data: insertedTopic, error: insertError } = await supabase
      .from("topics")
      .insert({
        agent_id: agentId,
        title: article.title,
        url: article.url,
        source: article.source,
        summary: article.summary,
        status: "discovered",
        score: null,
      })
      .select()
      .single();

    if (insertError || !insertedTopic) {
      // If caught by DB unique constraint or error, skip
      console.warn(
        `[pipeline] Skipping topic insertion for ${article.url}:`,
        insertError?.message
      );
      continue;
    }

    newTopicsCount++;

    // 4b. Evaluate article using Groq Editorial Engine
    let evaluation;
    try {
      evaluation = await evaluateArticle({
        title: article.title,
        url: article.url,
        source: article.source,
        summary: article.summary,
        personaName: agent.name,
      });
    } catch (evalErr) {
      console.error(
        `[pipeline] Evaluation failed for topic ${insertedTopic.id}:`,
        evalErr
      );
      continue;
    }

    // 4c. Update topic record with score and final status ("publish" | "reject")
    const { error: updateError } = await supabase
      .from("topics")
      .update({
        score: evaluation.score,
        status: evaluation.decision,
      })
      .eq("id", insertedTopic.id);

    if (updateError) {
      console.error(
        `[pipeline] Failed to update topic status for ${insertedTopic.id}:`,
        updateError
      );
    }

    // 4d. Handle rejection (score < 75)
    if (evaluation.decision === "reject") {
      rejectedCount++;
      continue;
    }

    // 4e. Handle publication (score >= 75)
    publishedCount++;

    // Generate Oculus-style analytical post and selection rationale
    let generatedPost;
    try {
      generatedPost = await generatePost({
        article: {
          title: article.title,
          url: article.url,
          source: article.source,
          summary: article.summary,
        },
        evaluation: {
          score: evaluation.score,
          reason: evaluation.reason,
        },
        personaName: agent.name,
        personaDomain: agent.domain,
      });
    } catch (genErr) {
      console.error(
        `[pipeline] Post generation failed for topic ${insertedTopic.id}:`,
        genErr
      );
      continue;
    }

    // Check duplicate post protection (agent_id, topic_id)
    const { data: existingPost } = await supabase
      .from("posts")
      .select("id")
      .eq("agent_id", agentId)
      .eq("topic_id", insertedTopic.id)
      .maybeSingle();

    if (!existingPost) {
      const { error: postInsertError } = await supabase.from("posts").insert({
        agent_id: agentId,
        topic_id: insertedTopic.id,
        text: generatedPost.text,
        rationale: generatedPost.rationale,
        sources: [article.url],
      });

      if (postInsertError) {
        console.error(
          `[pipeline] Failed to insert post for topic ${insertedTopic.id}:`,
          postInsertError
        );
      }
    }
  }

    return {
      success: true,
      discovered: totalDiscovered,
      newTopics: newTopicsCount,
      rejected: rejectedCount,
      published: publishedCount,
      agentId,
    };
  } finally {
    activeRuns.delete(agentId);
  }
}
