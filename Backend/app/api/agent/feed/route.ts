import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────
// GET /api/agent/feed?agentId=...
// ──────────────────────────────────────────────
export async function GET(request: NextRequest) {
  let agentId = request.nextUrl.searchParams.get("agentId");

  if (!agentId || agentId.trim().length === 0) {
    agentId = "da694384-4f41-4204-8d25-df1abd2010fc";
  }

  // Check if the agent exists in Supabase
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

  // Fetch posts for this agent, newest first, with topic title
  const { data: agentPosts, error: postsError } = await supabase
    .from("posts")
    .select("id, created_at, text, rationale, sources, topics(title, score)")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Supabase posts query error:", postsError);
    return NextResponse.json(
      { error: "Failed to fetch feed." },
      { status: 500 }
    );
  }

  const posts = (agentPosts || []).map((p: any) => ({
    id: p.id,
    created_at: p.created_at,
    title: p.topics?.title || (p.text ? p.text.slice(0, 70) + "..." : "Cybersecurity Briefing"),
    text: p.text,
    rationale: p.rationale,
    sources: p.sources,
    score: p.topics?.score,
  }));

  return NextResponse.json({ posts }, { status: 200 });
}
