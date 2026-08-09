import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────
// GET /api/agent/feed?agentId=...
// ──────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const agentId = request.nextUrl.searchParams.get("agentId");

  if (!agentId || agentId.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing required query parameter: agentId." },
      { status: 400 }
    );
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

  // Fetch posts for this agent, newest first
  const { data: agentPosts, error: postsError } = await supabase
    .from("posts")
    .select("id, created_at, text, rationale, sources")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Supabase posts query error:", postsError);
    return NextResponse.json(
      { error: "Failed to fetch feed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ posts: agentPosts ?? [] }, { status: 200 });
}
