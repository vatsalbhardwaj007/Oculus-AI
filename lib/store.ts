// ──────────────────────────────────────────────
// In-memory agent store (temporary until DB is added)
// ──────────────────────────────────────────────

export interface Agent {
  agentId: string;
  persona: {
    name: string;
    domain: string;
  };
  createdAt: string;
}

export interface Post {
  id: string;
  createdAt: string;
  text: string;
  rationale: string;
  sources: string[];
}

// Singleton maps — shared across all API routes within the same server process
export const agents: Map<string, Agent> = new Map();
export const posts: Map<string, Post[]> = new Map(); // agentId → posts
