import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { runAgentPipeline, ConcurrencyError } from "@/lib/pipeline/runner";

// ──────────────────────────────────────────────
// POST /api/scheduler/tick
// Deployment-compatible cron endpoint.
// Authenticated via Authorization: Bearer <CRON_SECRET>.
// Finds active agents where schedule_enabled = true AND next_run_at <= now(),
// claims work safely, and executes ONE bounded cycle per agent.
// ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  let bearerToken: string | null = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    bearerToken = authHeader.substring(7).trim();
  }

  if (!cronSecret) {
    return NextResponse.json(
      { error: "Server configuration error: CRON_SECRET environment variable is missing." },
      { status: 500 }
    );
  }

  if (!bearerToken || bearerToken !== cronSecret) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid or missing Bearer token." },
      { status: 401 }
    );
  }

  try {
    const nowIso = new Date().toISOString();

    // Query active & enabled agents due for a run
    const { data: agents, error } = await supabase
      .from("agents")
      .select("*")
      .eq("schedule_enabled", true)
      .eq("status", "running");

    if (error) {
      console.error("[scheduler/tick] Error querying agents:", error);
      return NextResponse.json(
        { error: "Database error querying scheduled agents." },
        { status: 500 }
      );
    }

    const dueAgents = (agents || []).filter((agent: any) => {
      if (!agent.next_run_at) return true; // first run
      return new Date(agent.next_run_at) <= new Date();
    });

    if (dueAgents.length === 0) {
      return NextResponse.json({
        success: true,
        executed: 0,
        message: "No agents currently due for scheduling.",
      });
    }

    const results = [];
    for (const agent of dueAgents) {
      try {
        const summary = await runAgentPipeline(agent.id);
        results.push(summary);
      } catch (err: any) {
        if (err instanceof ConcurrencyError) {
          results.push({ agentId: agent.id, skipped: true, reason: err.message });
        } else {
          console.error(`[scheduler/tick] Error executing agent ${agent.id}:`, err);
          results.push({ agentId: agent.id, error: err.message || "Execution error" });
        }
      }
    }

    return NextResponse.json({
      success: true,
      executed: results.length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Scheduler tick failed." },
      { status: 500 }
    );
  }
}
