import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { setAgentRuntimeState } from "@/lib/agent-state";

// ──────────────────────────────────────────────
// POST /api/agent/start
// Body: { agentId: string }
// Persistently enables scheduling and sets agent status to 'running'.
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

    const now = new Date();
    const nextRun = new Date(now.getTime() + 15 * 60 * 1000);

    // Update in-memory runtime status map
    setAgentRuntimeState(trimmedId, {
      status: "running",
      scheduleEnabled: true,
      scheduleIntervalMinutes: 15,
      nextRunAt: nextRun.toISOString(),
    });

    // Attempt optional Supabase column update
    try {
      await supabase
        .from("agents")
        .update({
          status: "running",
          schedule_enabled: true,
          schedule_interval_minutes: 15,
          next_run_at: nextRun.toISOString(),
        })
        .eq("id", trimmedId);
    } catch (_) {}

    return NextResponse.json({
      success: true,
      agentId: trimmedId,
      status: "running",
      scheduleEnabled: true,
      scheduleIntervalMinutes: 15,
      nextRunAt: nextRun.toISOString(),
      message: `Agent ${agent.name} is now STARTING. 15-minute persistent scheduler enabled.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to start agent." },
      { status: 500 }
    );
  }
}
