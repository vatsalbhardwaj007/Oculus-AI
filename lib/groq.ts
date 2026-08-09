import Groq from "groq-sdk";

// ──────────────────────────────────────────────
// Groq client (singleton, server-side only)
// ──────────────────────────────────────────────
// Reads GROQ_API_KEY from environment variables.
// This variable does NOT have NEXT_PUBLIC_ prefix,
// so it is never exposed to browser/client-side code.

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing environment variable: GROQ_API_KEY. Add it to .env.local."
  );
}

export const groq = new Groq({ apiKey });

// Default fast model to use across the application
export const GROQ_MODEL = "llama-3.3-70b-versatile";
