import { createClient } from "@supabase/supabase-js";

// ──────────────────────────────────────────────
// Supabase server client (singleton)
// ──────────────────────────────────────────────
// Reads from environment variables set in .env.local:
//   NEXT_PUBLIC_SUPABASE_URL   — your Supabase project URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY — the publishable/anon key (safe for client-side)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SUPABASE_URL. " +
      "Add it to .env.local."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Add it to .env.local."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
