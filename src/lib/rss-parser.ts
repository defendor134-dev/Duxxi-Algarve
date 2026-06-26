// ============================================================
// Sporting CP - RSS Feed Parser for Portuguese Sports News
// Fetches real news from Record, A Bola, O Jogo
// ============================================================

export interface RSSArticle {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
  isFeatured?: boolean;
}

// Simple RSS parser (no external dependencies needed)
async function parseRSSFeed(url: string): Promise<RSSArticle[]> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SportingCPBot/1.0; +https://sporting-cp.vercel.app)",
      },
    });

    if (!response.ok) {
      console.warn(`RSS feed ${url} returned ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const articles: RSSArticle[] = [];

    // Parse items between <item> tags
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(xml)) !== null) {
      const itemXml = itemMatch[1];

      const getTag = (tag: string): string => {
        const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(itemXml);
        return match ? match[1].trim() : "";
      };

      const getCDATA = (tag: string): string => {
        const match = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i").exec(itemXml);
        if (match) return match[1].trim();
        return getTag(tag);
      };

      const title = getCDATA("title");
      const description = getCDATA("description");
      const link = getTag("link");
      const pubDate = getTag("pubDate");
      const content = getCDATA("content:encoded") || description;

      // Extract image from content
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
      const imgMatch = content.match(imgRegex);
      let imageUrl = imgMatch ? imgMatch[1] : "";

      // Fallback images by source
      if (!imageUrl) {
        if (url.includes("record")) {
          imageUrl = "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80";
        } else if (url.includes("abola")) {
          imageUrl = "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=800&q=80";
        } else {
          imageUrl = "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80";
        }
      }

      // Determine source name
      let source = "Desporto";
      if (url.includes("record")) source = "Record";
      else if (url.includes("abola")) source = "A Bola";
      else if (url.includes("ojogo")) source = "O Jogo";

      // Determine category based on content
      let category = "Desporto";
      const lowerContent = (title + " " + description).toLowerCase();
      if (lowerContent.includes("futebol") || lowerContent.includes("liga") || lowerContent.includes("sporting")) {
        category = "Futebol";
      } else if (lowerContent.includes("futsal")) {
        category = "Futsal";
      } else if (lowerContent.includes("andebol") || lowerContent.includes("handebol")) {
        category = "Andebol";
      } else if (lowerContent.includes("atletismo")) {
        category = "Atletismo";
      }

      // Format date
      const date = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();

      // Only include Sporting-related articles
      if (title.toLowerCase().includes("sporting") || description.toLowerCase().includes("sporting")) {
        articles.push({
        // Generate simple ID from URL
        id: `rss-${link.replace(/[^a-zA-Z0-9]/g, '').slice(-16)}`,
          title,
          description: description.replace(/<[^>]*>/g, "").slice(0, 300),
          content: content.replace(/<[^>]*>/g, ""),
          url: link,
          imageUrl,
          source,
          publishedAt: date,
          category,
        });
      }
    }

    return articles;
  } catch (error) {
    console.error(`Error parsing RSS feed ${url}:`, error);
    return [];
  }
}

// Fetch from all major Portuguese sports RSS feeds
export async function fetchAllRSSNews(): Promise<RSSArticle[]> {
  const rssFeeds = [
    "https://www.record.pt/rss",
    "https://www.abola.pt/rss",
    "https://www.ojogo.pt/rss",
  ];

  const results = await Promise.allSettled(rssFeeds.map(parseRSSFeed));

  const allArticles: RSSArticle[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allArticles.push(...result.value);
    }
  }

  // Sort by date (newest first)
  allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Mark first as featured
  if (allArticles.length > 0) {
    allArticles[0].isFeatured = true;
  }

  return allArticles;
}

// Cache for RSS data
let rssCache: { data: RSSArticle[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedRSSNews(): Promise<RSSArticle[]> {
  if (rssCache && Date.now() - rssCache.timestamp < CACHE_DURATION) {
    return rssCache.data;
  }

  const data = await fetchAllRSSNews();
  rssCache = { data, timestamp: Date.now() };
  return data;
}