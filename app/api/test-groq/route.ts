import { NextResponse } from "next/server";
import { groq, GROQ_MODEL } from "@/lib/groq";

// ──────────────────────────────────────────────
// GET /api/test-groq
// Temporary dev-only endpoint to verify Groq
// API connectivity. Sends a simple prompt and
// returns the model's response.
// ──────────────────────────────────────────────
export async function GET() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Respond with exactly: GROQ_CONNECTION_OK",
        },
      ],
      model: GROQ_MODEL,
    });

    const text =
      chatCompletion.choices[0]?.message?.content?.trim() ??
      "(no text returned)";

    return NextResponse.json({
      success: true,
      model: GROQ_MODEL,
      response: text,
    });
  } catch (error) {
    console.error("[test-groq] Error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    const isRateLimit =
      message.includes("429") || message.includes("rate_limit_exceeded");

    return NextResponse.json(
      {
        success: false,
        model: GROQ_MODEL,
        error: isRateLimit
          ? "Groq API rate limit exceeded. Please wait a moment and try again."
          : message,
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
