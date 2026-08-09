import { groq, GROQ_MODEL } from "@/lib/groq";

// ──────────────────────────────────────────────
// Editorial Judgment Engine Types
// ──────────────────────────────────────────────

export interface ArticleToEvaluate {
  title: string;
  url: string;
  source: string;
  summary: string;
  personaName?: string;
}

export interface EditorialBreakdown {
  domainRelevance: number; // Max 30 points
  technicalSignificance: number; // Max 25 points
  impact: number; // Max 20 points
  novelty: number; // Max 15 points
  timeliness: number; // Max 10 points
}

export interface EditorialEvaluation {
  decision: "publish" | "reject";
  score: number;
  breakdown: EditorialBreakdown;
  reason: string;
}

// ──────────────────────────────────────────────
// Editorial Evaluator Function
// ──────────────────────────────────────────────
export async function evaluateArticle(
  article: ArticleToEvaluate
): Promise<EditorialEvaluation> {
  const personaName = article.personaName || "Oculus AI";

  const systemPrompt = `You are an elite editorial judgment engine for "${personaName}".
Your domain expertise: AI Systems & Cybersecurity Analyst.
Your editorial philosophy: "Signal over hype. Systems over headlines."

Your task is to critically evaluate a single discovered article/topic for publication.

CRITICAL INSTRUCTIONS:
- Be highly skeptical of marketing buzzwords, PR fluff, and speculative AI hype.
- Prefer technically meaningful engineering developments, architecture changes, security vulnerabilities, research, and real-world system implementations.
- Reject low-information promotional announcements or repetitive topics.
- Base your evaluation STRICTLY on the article title, source, and summary provided. Do NOT invent information or external facts.

SCORING RUBRIC (Total = 100 points):
1. Domain relevance (0 - 30 points): How strongly does it relate to AI systems, cybersecurity, AI infrastructure, AI agents, ML systems, or the intersection of AI and security?
2. Technical significance (0 - 25 points): Does it contain meaningful technical information, architecture changes, research findings, engineering specs, or security vulnerabilities?
3. Impact (0 - 20 points): Could this materially affect developers, researchers, organizations, infrastructure, or cybersecurity?
4. Novelty (0 - 15 points): Does it present genuinely new information rather than repeating well-known facts/news?
5. Timeliness (0 - 10 points): Is this current and worth discussing right now?

PUBLISHING THRESHOLD:
- Score >= 70 points → PUBLISH
- Score < 70 points → REJECT

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching this exact structure:
{
  "decision": "publish" | "reject",
  "score": number,
  "breakdown": {
    "domainRelevance": number,
    "technicalSignificance": number,
    "impact": number,
    "novelty": number,
    "timeliness": number
  },
  "reason": "concise, sharp explanation of the editorial decision"
}
`;

  const userPrompt = `Evaluate the following article:

Title: ${article.title}
URL: ${article.url}
Source: ${article.source}
Summary: ${article.summary}`;

  const chatCompletion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const content = chatCompletion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response returned from Groq model during evaluation.");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse LLM evaluation JSON response: ${content}`);
  }

  // ──────────────────────────────────────────────
  // Server-Side Score & Threshold Validation
  // ──────────────────────────────────────────────
  const rawBreakdown = parsed.breakdown || {};

  const clamp = (val: number, min: number, max: number): number => {
    const num = typeof val === "number" && !isNaN(val) ? val : 0;
    return Math.min(Math.max(Math.round(num), min), max);
  };

  const breakdown: EditorialBreakdown = {
    domainRelevance: clamp(rawBreakdown.domainRelevance, 0, 30),
    technicalSignificance: clamp(rawBreakdown.technicalSignificance, 0, 25),
    impact: clamp(rawBreakdown.impact, 0, 20),
    novelty: clamp(rawBreakdown.novelty, 0, 15),
    timeliness: clamp(rawBreakdown.timeliness, 0, 10),
  };

  // Re-calculate exact sum server-side to prevent arithmetic mismatch
  const validatedScore =
    breakdown.domainRelevance +
    breakdown.technicalSignificance +
    breakdown.impact +
    breakdown.novelty +
    breakdown.timeliness;

  // Strictly determine decision based on server-validated score (threshold >= 70)
  const validatedDecision: "publish" | "reject" =
    validatedScore >= 70 ? "publish" : "reject";

  const reason =
    typeof parsed.reason === "string" && parsed.reason.trim().length > 0
      ? parsed.reason.trim()
      : "Evaluated against editorial standards.";

  return {
    decision: validatedDecision,
    score: validatedScore,
    breakdown,
    reason,
  };
}
