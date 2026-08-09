import { DiscoveredArticle } from "./sources";

// ──────────────────────────────────────────────
// Dynamic Search Queries for AI & Cybersecurity
// ──────────────────────────────────────────────
const DYNAMIC_SEARCH_QUERIES = [
  "latest AI systems cybersecurity vulnerabilities zero day exploit 2026",
  "frontier LLM security agent permission boundaries breakthrough",
  "cloud infrastructure ransomware CVE advisory threat intelligence",
  "AI model hijacking prompt injection vulnerability research 2026",
];

/**
 * Fetch dynamic articles using Tavily AI Search API.
 */
export async function searchTavily(apiKey: string): Promise<DiscoveredArticle[]> {
  const articles: DiscoveredArticle[] = [];

  for (const query of DYNAMIC_SEARCH_QUERIES) {
    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          topic: "news",
          search_depth: "advanced",
          max_results: 10,
        }),
      });

      if (!response.ok) {
        console.warn(`[tavily] Search failed (${response.status}): ${await response.text()}`);
        continue;
      }

      const data = await response.json();
      const results = data.results || [];

      for (const item of results) {
        if (!item.url || !item.title) continue;
        let sourceName = "Tavily Web Search";
        try {
          sourceName = new URL(item.url).hostname.replace(/^www\./, "");
        } catch (_) {}

        articles.push({
          title: item.title.trim(),
          url: item.url.trim(),
          source: sourceName,
          publishedAt: item.published_date || new Date().toISOString(),
          summary: item.content?.trim().slice(0, 500) || item.snippet?.trim().slice(0, 500) || null,
        });
      }
    } catch (err) {
      console.error("[tavily] Error during search execution:", err);
    }
  }

  return articles;
}

/**
 * Fetch dynamic articles using Firecrawl Search API.
 */
export async function searchFirecrawl(apiKey: string): Promise<DiscoveredArticle[]> {
  const articles: DiscoveredArticle[] = [];

  for (const query of DYNAMIC_SEARCH_QUERIES) {
    try {
      const response = await fetch("https://api.firecrawl.dev/v1/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          limit: 10,
        }),
      });

      if (!response.ok) {
        console.warn(`[firecrawl] Search failed (${response.status}): ${await response.text()}`);
        continue;
      }

      const data = await response.json();
      const results = data.data || data.results || [];

      for (const item of results) {
        if (!item.url || !item.title) continue;
        let sourceName = "Firecrawl Search";
        try {
          sourceName = new URL(item.url).hostname.replace(/^www\./, "");
        } catch (_) {}

        articles.push({
          title: item.title.trim(),
          url: item.url.trim(),
          source: sourceName,
          publishedAt: item.publishedDate || new Date().toISOString(),
          summary: item.description?.trim().slice(0, 500) || item.markdown?.trim().slice(0, 500) || null,
        });
      }
    } catch (err) {
      console.error("[firecrawl] Error during search execution:", err);
    }
  }

  return articles;
}
