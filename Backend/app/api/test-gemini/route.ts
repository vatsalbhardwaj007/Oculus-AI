import { NextResponse } from "next/server";
import { gemini, GEMINI_MODEL } from "@/lib/gemini";

// ──────────────────────────────────────────────
// GET /api/test-gemini
// Temporary dev-only endpoint to verify Gemini
// API connectivity. Sends a simple prompt and
// returns the model's response.
// ──────────────────────────────────────────────
export async function GET() {
  try {
    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: "Respond with exactly: GEMINI_CONNECTION_OK",
    });

    const text = response.text?.trim() ?? "(no text returned)";

    return NextResponse.json({
      success: true,
      model: GEMINI_MODEL,
      response: text,
    });
  } catch (error) {
    console.error("[test-gemini] Error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    const isRateLimit =
      message.includes("429") || message.includes("quota");

    return NextResponse.json(
      {
        success: false,
        model: GEMINI_MODEL,
        error: isRateLimit
          ? "Gemini API rate limit exceeded. The API key is valid but quota is temporarily exhausted. Wait a few minutes and try again."
          : message,
      },
      { status: isRateLimit ? 429 : 500 }
    );
  }
}
