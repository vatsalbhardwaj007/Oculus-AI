import Parser from "rss-parser";
import {
  DiscoveredArticle,
  RSSSource,
  RSS_SOURCES,
} from "./sources";
import { searchTavily, searchFirecrawl } from "./web-search";

// ──────────────────────────────────────────────
// RSS feed fetcher
// ──────────────────────────────────────────────

const parser = new Parser({
  timeout: 10_000,  // 10 second timeout per feed
  headers: {
    // Some feeds block requests without a User-Agent
    "User-Agent": "OculusAI/1.0 (RSS Reader)",
  },
});

/**
 * Fetch and parse a single RSS feed.
 */
async function fetchFeed(source: RSSSource): Promise<DiscoveredArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);

    return (feed.items ?? []).map((item) => ({
      title: item.title?.trim() ?? "Untitled",
      url: item.link?.trim() ?? "",
      source: source.name,
      publishedAt: item.isoDate ?? item.pubDate ?? null,
      summary:
        item.contentSnippet?.trim().slice(0, 500) ??
        item.content?.replace(/<[^>]*>/g, "").trim().slice(0, 500) ??
        null,
    }));
  } catch (error) {
    console.error(`[discovery] Failed to fetch ${source.name} (${source.url}):`, error);
    return [];
  }
}

/**
 * Fetch articles from RSS sources AND dynamic Web Search APIs (Tavily / Firecrawl).
 */
export async function discoverArticles(
  sources: RSSSource[] = RSS_SOURCES
): Promise<DiscoveredArticle[]> {
  const articles: DiscoveredArticle[] = [];

  // 1. Check for Tavily / Firecrawl Web Search API keys
  const tavilyApiKey = process.env.TAVILY_API_KEY;
  const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;

  const searchPromises: Promise<DiscoveredArticle[]>[] = [];

  if (tavilyApiKey) {
    console.log("[discovery] Executing dynamic web search via Tavily API...");
    searchPromises.push(searchTavily(tavilyApiKey));
  }

  if (firecrawlApiKey) {
    console.log("[discovery] Executing dynamic web crawl via Firecrawl API...");
    searchPromises.push(searchFirecrawl(firecrawlApiKey));
  }

  // 2. Fetch RSS feeds in parallel
  const rssPromises = sources.map((source) => fetchFeed(source));

  // Run all discovery methods concurrently
  const [searchResults, ...rssResults] = await Promise.all([
    Promise.all(searchPromises),
    ...rssPromises.map((p) => p.then((res) => ({ status: "fulfilled", value: res })).catch((err) => ({ status: "rejected", reason: err }))),
  ]);

  // Aggregate dynamic search results
  for (const list of searchResults) {
    articles.push(...list);
  }

  // Aggregate RSS feed results
  for (const res of rssResults) {
    if (res.status === "fulfilled" && Array.isArray((res as any).value)) {
      articles.push(...(res as any).value);
    }
  }

  // Deduplicate by URL within the discovered batch
  const seenUrls = new Set<string>();
  const uniqueArticles: DiscoveredArticle[] = [];

  for (const article of articles) {
    if (article.url && article.url.length > 0 && !seenUrls.has(article.url)) {
      seenUrls.add(article.url);
      uniqueArticles.push(article);
    }
  }

  return uniqueArticles;
}

