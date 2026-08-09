import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ──────────────────────────────────────────────
// POST /api/agent/init
// ──────────────────────────────────────────────
export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  // Validate top-level structure
  if (
    typeof body !== "object" ||
    body === null ||
    !("persona" in body)
  ) {
    return NextResponse.json(
      { error: "Missing required field: persona." },
      { status: 400 }
    );
  }

  const { persona } = body as { persona: unknown };

  // Validate persona object
  if (typeof persona !== "object" || persona === null) {
    return NextResponse.json(
      { error: "Field 'persona' must be an object." },
      { status: 400 }
    );
  }

  const { name, domain } = persona as { name: unknown; domain: unknown };

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid field: persona.name (must be a non-empty string)." },
      { status: 400 }
    );
  }

  if (typeof domain !== "string" || domain.trim().length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid field: persona.domain (must be a non-empty string)." },
      { status: 400 }
    );
  }

  // Insert into Supabase — id and created_at use database defaults
  const { data, error } = await supabase
    .from("agents")
    .insert({ name: name.trim(), domain: domain.trim() })
    .select("id")
    .single();

  if (error || !data) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Failed to initialize agent." },
      { status: 500 }
    );
  }

  return NextResponse.json({ agentId: data.id }, { status: 200 });
}
