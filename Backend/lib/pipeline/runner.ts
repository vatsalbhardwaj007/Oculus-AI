import { supabase } from "@/lib/supabase";
import { discoverArticles } from "@/lib/discovery/fetch-feeds";
import { DiscoveredArticle } from "@/lib/discovery/sources";
import { evaluateArticle } from "@/lib/editorial/evaluator";
import { generatePost } from "@/lib/editorial/post-generator";

// ──────────────────────────────────────────────
// Pipeline Summary Interface
// ──────────────────────────────────────────────
// ──────────────────────────────────────────────
// Token/API Protection Constants
// ──────────────────────────────────────────────
export const MAX_DISCOVERED_ARTICLES = 200;
export const MAX_EVALUATIONS_PER_CYCLE = 30;
export const MAX_POSTS_PER_CYCLE = 3;

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
  isProduction: boolean;
  publishedToProduction: boolean;
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
  const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    // 1. Fetch agent identity & state from Supabase
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

    const isProduction = true;

    // Try setting run lock in DB
    try {
      await supabase.from("agents").update({ current_run_id: runId }).eq("id", agentId);
    } catch (_) {}

    // 2. Discover articles from configured RSS sources
    const rawDiscovered = await discoverArticles();
    const totalDiscovered = rawDiscovered.length;

    if (totalDiscovered === 0) {
      const now = new Date();
      const nextRun = new Date(now.getTime() + 15 * 60 * 1000);
      try {
        await supabase.from("agents").update({
          last_run_at: now.toISOString(),
          next_run_at: nextRun.toISOString(),
          current_run_id: null,
        }).eq("id", agentId);
      } catch (_) {}

      return {
        success: true,
        discovered: 0,
        newTopics: 0,
        rejected: 0,
        published: 0,
        agentId,
        isProduction,
        publishedToProduction: false,
      };
    }

    // 3. Fetch completed decisions (publish or reject) for this agent to prevent re-evaluating finished topics
    const { data: existingTopicRows, error: fetchTopicsError } = await supabase
      .from("topics")
      .select("id, url, title, source, summary, status")
      .eq("agent_id", agentId);

    if (fetchTopicsError) {
      console.error("[pipeline] Error checking existing topics:", fetchTopicsError);
    }

    const completedUrlSet = new Set(
      (existingTopicRows || [])
        .filter((row: { status: string }) => row.status === "publish" || row.status === "reject")
        .map((row: { url: string }) => row.url)
    );

    // Candidates are articles that have NOT yet received a final publish/reject decision
    const candidateArticles: DiscoveredArticle[] = rawDiscovered.filter(
      (article) => article.url.length > 0 && !completedUrlSet.has(article.url)
    );

    let newTopicsCount = 0;
    let rejectedCount = 0;
    let publishedCount = 0;

    // 4. Process candidate articles sequentially until published quota is reached or candidates exhausted
    for (const article of candidateArticles) {
      // Stop if max posts quota reached per cycle
      if (publishedCount >= MAX_POSTS_PER_CYCLE) {
        break;
      }

      // Check if topic already exists in "discovered" state in Supabase
      let topicRecord = (existingTopicRows || []).find((row: { url: string }) => row.url === article.url);

      if (!topicRecord) {
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
          console.warn(
            `[pipeline] Skipping topic insertion for ${article.url}:`,
            insertError?.message
          );
          continue;
        }
        topicRecord = insertedTopic;
        newTopicsCount++;
      }

      if (!topicRecord) {
        continue;
      }

      // 4b. Evaluate article using Groq Editorial Engine
      let evaluation;
      try {
        evaluation = await evaluateArticle({
          title: article.title,
          url: article.url,
          source: article.source,
          summary: article.summary || "",
          personaName: agent.name,
        });
      } catch (evalErr) {
        console.error(
          `[pipeline] Evaluation failed for topic ${topicRecord.id}:`,
          evalErr
        );
        continue;
      }

      // 4c. Update topic record with score and final status ("publish" | "reject")
      await supabase
        .from("topics")
        .update({
          score: evaluation.score,
          status: evaluation.decision,
        })
        .eq("id", topicRecord.id);

      // 4d. Handle rejection (score < 70)
      if (evaluation.decision === "reject") {
        rejectedCount++;
        continue;
      }

      // 4e. Handle publication (score >= 75)
      publishedCount++;

      // Generate analytical post and selection rationale
      let generatedPost;
      try {
        generatedPost = await generatePost({
          article: {
            title: article.title,
            url: article.url,
            source: article.source,
            summary: article.summary || "",
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
          `[pipeline] Post generation failed for topic ${topicRecord.id}:`,
          genErr
        );
        continue;
      }

      // Check duplicate post protection (agent_id, topic_id)
      const { data: existingPost } = await supabase
        .from("posts")
        .select("id")
        .eq("agent_id", agentId)
        .eq("topic_id", topicRecord.id)
        .maybeSingle();

      if (!existingPost) {
        await supabase.from("posts").insert({
          agent_id: agentId,
          topic_id: topicRecord.id,
          text: generatedPost.text,
          rationale: generatedPost.rationale,
          sources: [article.url],
        });
      }
    }

    // 5. Update agent schedule timestamps in Supabase
    const now = new Date();
    const nextRun = new Date(now.getTime() + 15 * 60 * 1000); // +15 minutes
    const summaryData = {
      success: true,
      discovered: totalDiscovered,
      newTopics: newTopicsCount,
      rejected: rejectedCount,
      published: publishedCount,
      agentId,
      isProduction,
      publishedToProduction: isProduction && publishedCount > 0,
    };

    try {
      await supabase.from("agents").update({
        last_run_at: now.toISOString(),
        next_run_at: nextRun.toISOString(),
        current_run_id: null,
        last_run_summary: summaryData,
      }).eq("id", agentId);
    } catch (_) {}

    return summaryData;
  } finally {
    activeRuns.delete(agentId);
  }
}

