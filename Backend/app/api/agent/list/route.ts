import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAgentRuntimeState } from "@/lib/agent-state";

// ──────────────────────────────────────────────
// GET /api/agent/list
// Returns all configured agents with scheduling and status metadata.
// ──────────────────────────────────────────────
export async function GET() {
  try {
    const { data: rawAgents, error } = await supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[agent/list] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch agents." },
        { status: 500 }
      );
    }

    const agents = (rawAgents || []).map((a: any) => {
      const runtime = getAgentRuntimeState(a.id);
      return {
        id: a.id,
        name: a.name,
        domain: a.domain,
        createdAt: a.created_at,
        status: runtime.status || a.status || "stopped",
        scheduleEnabled: runtime.scheduleEnabled ?? Boolean(a.schedule_enabled),
        scheduleIntervalMinutes: a.schedule_interval_minutes ?? 15,
        lastRunAt: a.last_run_at || null,
        nextRunAt: runtime.nextRunAt || a.next_run_at || null,
        isProduction: Boolean(a.is_production ?? (a.name === "Oculus AI")),
        lastRunSummary: a.last_run_summary || null,
      };
    });

    return NextResponse.json({ agents }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
