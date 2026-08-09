import Parser from "rss-parser";
import {
  DiscoveredArticle,
  RSSSource,
  RSS_SOURCES,
} from "./sources";

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
 * Returns an array of discovered articles.
 * On failure (network error, malformed XML, etc.) returns an empty array
 * and logs the error — does NOT throw.
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
 * Fetch articles from ALL configured RSS sources.
 * Each source is fetched in parallel. Failed sources are silently skipped
 * (logged to console) so one broken feed doesn't block the others.
 */
export async function discoverArticles(
  sources: RSSSource[] = RSS_SOURCES
): Promise<DiscoveredArticle[]> {
  const results = await Promise.allSettled(
    sources.map((source) => fetchFeed(source))
  );

  const articles: DiscoveredArticle[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    }
    // rejected results are already logged inside fetchFeed
  }

  // Filter out articles with no URL (unusable)
  return articles.filter((a) => a.url.length > 0);
}
