import { supabase } from "@/lib/supabase";
import { DiscoveredArticle } from "./sources";

// ──────────────────────────────────────────────
// Result of persisting discovered articles
// ──────────────────────────────────────────────

export interface PersistResult {
  newTopics: number;       // how many new rows were inserted
  existingTopics: number;  // how many were skipped (already in DB)
  errors: number;          // how many failed to insert
}

/**
 * Persist discovered articles into the Supabase `topics` table.
 *
 * Duplicate protection is two-layered:
 *   1. Application-level: batch-fetch existing URLs, skip known ones.
 *   2. Database-level: UNIQUE(agent_id, url) constraint with
 *      ON CONFLICT DO NOTHING, so even race conditions are safe.
 */
export async function persistTopics(
  agentId: string,
  articles: DiscoveredArticle[]
): Promise<PersistResult> {
  const result: PersistResult = {
    newTopics: 0,
    existingTopics: 0,
    errors: 0,
  };

  // Collect all URLs from the incoming articles (skip empty URLs)
  const articlesWithUrl = articles.filter((a) => a.url.length > 0);

  if (articlesWithUrl.length === 0) {
    return result;
  }

  // ── Layer 1: Application-level dedup ──────────────────────
  // Batch-fetch all existing URLs for this agent in one query
  const urls = articlesWithUrl.map((a) => a.url);

  const { data: existingRows, error: fetchError } = await supabase
    .from("topics")
    .select("url")
    .eq("agent_id", agentId)
    .in("url", urls);

  if (fetchError) {
    console.error("[persist] Failed to fetch existing topics:", fetchError);
    result.errors = articlesWithUrl.length;
    return result;
  }

  const existingUrls = new Set(
    (existingRows ?? []).map((row: { url: string }) => row.url)
  );

  // Separate new articles from duplicates
  const newArticles: DiscoveredArticle[] = [];

  for (const article of articlesWithUrl) {
    if (existingUrls.has(article.url)) {
      result.existingTopics++;
    } else {
      newArticles.push(article);
    }
  }

  if (newArticles.length === 0) {
    return result;
  }

  // ── Layer 2: Database-level dedup via ON CONFLICT ─────────
  // Even if the app-level check missed a duplicate (race condition),
  // the UNIQUE(agent_id, url) constraint + ignoreDuplicates will
  // silently skip it instead of erroring.
  const rows = newArticles.map((article) => ({
    agent_id: agentId,
    title: article.title,
    url: article.url,
    source: article.source,
    summary: article.summary,
    score: null,
    status: "discovered",
  }));

  const { data: inserted, error: insertError } = await supabase
    .from("topics")
    .upsert(rows, {
      onConflict: "agent_id,url",
      ignoreDuplicates: true,      // ON CONFLICT DO NOTHING
    })
    .select("id");

  if (insertError) {
    console.error("[persist] Batch upsert failed:", insertError);
    result.errors = newArticles.length;
    return result;
  }

  result.newTopics = inserted?.length ?? 0;

  // Any rows that passed app-level check but were caught by the DB
  // constraint won't appear in `inserted`, so adjust the count.
  const dbSkipped = newArticles.length - result.newTopics - result.errors;
  if (dbSkipped > 0) {
    result.existingTopics += dbSkipped;
  }

  return result;
}
