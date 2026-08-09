// ──────────────────────────────────────────────
// Discovered article — the shape of data coming
// out of any RSS/discovery source.
// ──────────────────────────────────────────────

export interface DiscoveredArticle {
  title: string;
  url: string;
  source: string;          // publication name (e.g. "TechCrunch")
  publishedAt: string | null;  // ISO date string, null if unavailable
  summary: string | null;      // short description, null if unavailable
}

// ──────────────────────────────────────────────
// RSS source configuration — add new feeds here
// ──────────────────────────────────────────────

export interface RSSSource {
  name: string;   // human-readable publication name
  url: string;    // RSS/Atom feed URL
}

export const RSS_SOURCES: RSSSource[] = [
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
  },
  {
    name: "The Verge AI",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  },
];
