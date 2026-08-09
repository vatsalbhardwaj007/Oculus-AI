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
  {
    name: "The Hacker News",
    url: "https://feeds.feedburner.com/TheHackersNews",
  },
  {
    name: "BleepingComputer",
    url: "https://www.bleepingcomputer.com/feed/",
  },
  {
    name: "Dark Reading",
    url: "https://www.darkreading.com/rss.xml",
  },
  {
    name: "MIT Technology Review AI",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
  },
  {
    name: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
  },
  {
    name: "Schneier on Security",
    url: "https://www.schneier.com/feed/atom/",
  },
  {
    name: "Krebs on Security",
    url: "https://krebsonsecurity.com/feed/",
  },
  {
    name: "SecurityWeek",
    url: "https://www.securityweek.com/feed/",
  },
  {
    name: "The Register Security",
    url: "https://www.theregister.com/security/headlines.atom",
  },
  {
    name: "AWS Security Blog",
    url: "https://aws.amazon.com/blogs/security/feed/",
  },
  {
    name: "Microsoft Security Blog",
    url: "https://www.microsoft.com/en-us/security/blog/feed/",
  },
  {
    name: "CSO Online",
    url: "https://www.csoonline.com/feed/",
  },
  {
    name: "Zero Day Initiative Blog",
    url: "https://www.zerodayinitiative.com/blog?format=rss",
  },
  {
    name: "Help Net Security",
    url: "https://www.helpnetsecurity.com/feed/",
  },
  {
    name: "CyberScoop",
    url: "https://cyberscoop.com/feed/",
  },
  {
    name: "VentureBeat Security",
    url: "https://venturebeat.com/category/security/feed/",
  },
  {
    name: "InfoQ AI & ML",
    url: "https://feed.infoq.com/ai-ml-data-eng/",
  },
  {
    name: "Hacker News (YCombinator)",
    url: "https://news.ycombinator.com/rss",
  },
];


