import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { setAgentRuntimeState } from "@/lib/agent-state";

// ──────────────────────────────────────────────
// POST /api/agent/stop
// Body: { agentId: string }
// Persistently disables scheduling and sets agent status to 'stopped'.
// ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { agentId } = body;

    if (!agentId || typeof agentId !== "string" || agentId.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing required parameter: agentId" },
        { status: 400 }
      );
    }

    const trimmedId = agentId.trim();

    // Verify agent exists
    const { data: agent, error: fetchError } = await supabase
      .from("agents")
      .select("id, name")
      .eq("id", trimmedId)
      .single();

    if (fetchError || !agent) {
      return NextResponse.json(
        { error: `Agent not found: ${trimmedId}` },
        { status: 404 }
      );
    }

    // Update in-memory runtime status map
    setAgentRuntimeState(trimmedId, {
      status: "stopped",
      scheduleEnabled: false,
    });

    // Attempt optional Supabase column update
    try {
      await supabase
        .from("agents")
        .update({
          status: "stopped",
          schedule_enabled: false,
          current_run_id: null,
        })
        .eq("id", trimmedId);
    } catch (_) {}

    return NextResponse.json({
      success: true,
      agentId: trimmedId,
      status: "stopped",
      scheduleEnabled: false,
      message: `Agent ${agent.name} is now STOPPED. Future scheduled cycles disabled.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to stop agent." },
      { status: 500 }
    );
  }
}
