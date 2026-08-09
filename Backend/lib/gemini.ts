import { GoogleGenAI } from "@google/genai";

// ──────────────────────────────────────────────
// Gemini client (singleton, server-side only)
// ──────────────────────────────────────────────
// Reads GEMINI_API_KEY from environment variables.
// This variable does NOT have NEXT_PUBLIC_ prefix,
// so it is never exposed to browser/client-side code.

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing environment variable: GEMINI_API_KEY. Add it to .env.local."
  );
}

export const gemini = new GoogleGenAI({ apiKey });

// Default model to use across the application
export const GEMINI_MODEL = "gemini-2.0-flash-lite";
