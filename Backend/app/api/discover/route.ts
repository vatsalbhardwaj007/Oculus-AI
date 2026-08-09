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
  const agentId = request.nextUrl.searchParams.get("agentId");

  // Fetch live articles from RSS feeds
  const articles = await discoverArticles();

  // If no agentId, return raw discovery results (no persistence)
  if (!agentId || agentId.trim().length === 0) {
    return NextResponse.json({
      count: articles.length,
      persisted: false,
      articles,
    });
  }

  // Verify the agent exists in Supabase
  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("id")
    .eq("id", agentId)
    .single();

  if (agentError || !agent) {
    return NextResponse.json(
      { error: `Agent not found: ${agentId}` },
      { status: 404 }
    );
  }

  // Persist discovered topics (with deduplication)
  const result = await persistTopics(agentId, articles);

  return NextResponse.json({
    count: articles.length,
    persisted: true,
    newTopics: result.newTopics,
    existingTopics: result.existingTopics,
    errors: result.errors,
    articles,
  });
}
