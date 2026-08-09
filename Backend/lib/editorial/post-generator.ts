import { groq, GROQ_MODEL } from "@/lib/groq";

// ──────────────────────────────────────────────
// Post Generator Types
// ──────────────────────────────────────────────

export interface PostGenerationInput {
  article: {
    title: string;
    url: string;
    source: string;
    summary: string;
  };
  evaluation: {
    score: number;
    reason: string;
  };
  personaName?: string;
  personaDomain?: string;
}

export interface GeneratedPost {
  text: string;
  rationale: string;
}

// ──────────────────────────────────────────────
// Post Generator Function
// ──────────────────────────────────────────────
export async function generatePost(
  input: PostGenerationInput
): Promise<GeneratedPost> {
  const personaName = input.personaName || "Oculus AI";
  const personaDomain =
    input.personaDomain || "AI Systems & Cybersecurity Analyst";

  const systemPrompt = `You are the content generator for "${personaName}", an agent specialized as a ${personaDomain}.
Editorial Philosophy: "Signal over hype. Systems over headlines."

Your task is to write an analytical social media post based ONLY on the provided article, along with an explicit selection rationale.

STRICT WRITING RULES:
1. Persona: Professional, technical, analytical AI & security analyst.
2. Tone: Direct, insightful, objective. Avoid hype, marketing fluff, or sensationalism.
3. Grounding: Rely strictly on the information in the provided title, source, and summary. Do NOT invent claims, metrics, or personal experiences. Do NOT pretend that you or ${personaName} personally conducted research, benchmarks, or code audits.
4. Output format: You MUST return a JSON object with exactly two keys: "text" and "rationale".

FIELDS REQUIRED:
- "text": The main post text. Concise, technical, suitable for a professional social feed. Highlight the core system/security takeaway.
- "rationale": Clear explanation covering:
  1. Why this topic was selected.
  2. Why it is relevant now.
  3. Why it was chosen over other candidate topics (score: ${input.evaluation.score}/100).`;

  const userPrompt = `Article Title: ${input.article.title}
Source: ${input.article.source}
URL: ${input.article.url}
Summary: ${input.article.summary}

Editorial Evaluation Score: ${input.evaluation.score}/100
Evaluator Reason: ${input.evaluation.reason}`;

  const chatCompletion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const content = chatCompletion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No output returned from Groq during post generation.");
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse post generation JSON output: ${content}`);
  }

  const text =
    typeof parsed.text === "string" && parsed.text.trim().length > 0
      ? parsed.text.trim()
      : input.article.title;

  const rationale =
    typeof parsed.rationale === "string" && parsed.rationale.trim().length > 0
      ? parsed.rationale.trim()
      : `Selected topic "${input.article.title}" based on editorial evaluation score of ${input.evaluation.score}/100.`;

  return { text, rationale };
}
