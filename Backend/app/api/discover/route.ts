import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { discoverArticles, persistTopics } from "@/lib/discovery";

// ──────────────────────────────────────────────
// GET /api/discover?agentId=...
//
// Fetches live RSS feeds and returns discovered articles.
// If agentId is provided, also persists new topics to Supabase.
// If agentId is omitted, returns articles without persisting
// (useful for testing the RSS layer in isolation).
// ──────────────────────────────────────────────
export async function GET(request: NextRequest) {
  let agentId = request.nextUrl.searchParams.get("agentId");

  // Fetch live articles from RSS feeds
  const articles = await discoverArticles();

  // If no agentId specified, default to active test agent or first agent in database
  if (!agentId || agentId.trim().length === 0) {
    const { data: agent } = await supabase
      .from("agents")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    agentId = agent?.id || "da694384-4f41-4204-8d25-df1abd2010fc";
  }

  const targetAgentId: string = agentId ?? "da694384-4f41-4204-8d25-df1abd2010fc";

  // Persist discovered topics (with deduplication) to Supabase
  const result = await persistTopics(targetAgentId, articles);

  return NextResponse.json({
    count: articles.length,
    persisted: true,
    newTopics: result.newTopics,
    existingTopics: result.existingTopics,
    errors: result.errors,
    articles,
  });
}
