import { NextResponse } from "next/server";
import { evaluateArticle, ArticleToEvaluate } from "@/lib/editorial/evaluator";

// ──────────────────────────────────────────────
// POST /api/test-evaluate
// Dev-only endpoint to test editorial evaluation
// of a single article.
// ──────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, url, source, summary, personaName } = body || {};

    if (!title || !url) {
      return NextResponse.json(
        { error: "Missing required fields: title and url are required." },
        { status: 400 }
      );
    }

    const article: ArticleToEvaluate = {
      title: String(title),
      url: String(url),
      source: source ? String(source) : "Unknown",
      summary: summary ? String(summary) : "",
      personaName: personaName ? String(personaName) : undefined,
    };

    const evaluation = await evaluateArticle(article);

    return NextResponse.json({
      success: true,
      input: article,
      evaluation,
    });
  } catch (error) {
    console.error("[test-evaluate] Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
