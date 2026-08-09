import { NextResponse } from "next/server";
import { runAgentPipeline, ConcurrencyError } from "@/lib/pipeline/runner";
import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────
// POST /api/agent/run
// Endpoint for triggering the publishing pipeline.
// Supports both:
// 1. Manual dev mode: { "agentId": "uuid" } in body.
// 2. Scheduler-triggered mode: Authenticated via
//    "Authorization: Bearer <CRON_SECRET>". Auto-selects
//    the initialized agent from the database.
// ──────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = request.headers.get("authorization");

    // Extract Bearer token if present
    let bearerToken: string | null = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      bearerToken = authHeader.substring(7).trim();
    }

    const body = await request.json().catch(() => ({}));
    let agentId: string | undefined =
      typeof body?.agentId === "string" && body.agentId.trim().length > 0
        ? body.agentId.trim()
        : undefined;

    // ──────────────────────────────────────────────
    // 1. Scheduler Mode vs Manual Dev Mode Check
    // ──────────────────────────────────────────────
    const isSchedulerMode = !agentId;

    if (isSchedulerMode || bearerToken !== null) {
      // If scheduler mode or bearer token supplied, enforce CRON_SECRET auth
      if (!cronSecret) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Server configuration error: CRON_SECRET environment variable is missing.",
          },
          { status: 500 }
        );
      }

      if (!bearerToken || bearerToken !== cronSecret) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized: Invalid or missing Bearer token.",
          },
          { status: 401 }
        );
      }
    }

    // ──────────────────────────────────────────────
    // 2. Agent Auto-Lookup if agentId was omitted
    // ──────────────────────────────────────────────
    if (!agentId) {
      const { data: agent, error: fetchError } = await supabase
        .from("agents")
        .select("id")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (fetchError || !agent) {
        return NextResponse.json(
          {
            success: false,
            error: "No initialized agent found. Run POST /api/agent/init first.",
          },
          { status: 404 }
        );
      }

      agentId = agent.id;
    }

    // ──────────────────────────────────────────────
    // 3. Execute Pipeline
    // ──────────────────────────────────────────────
    const summary = await runAgentPipeline(agentId);

    return NextResponse.json(summary);
  } catch (error) {
    if (error instanceof ConcurrencyError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 409 }
      );
    }

    console.error("[agent/run] Execution error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
