// ============================================================
// API Route: /api/news
// Fetches news from mock data and external RSS feeds
// In production, integrate with actual APIs
// ============================================================

import { NextResponse } from "next/server";
import { getNews } from "@/lib/services/data-service";

// Cache control: revalidate every 5 minutes
export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    // Use the data service to abstract away the data source (RSS/mock)
    const news = await getNews({
      category: category ?? undefined,
      limit: limit > 0 ? limit : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        count: news.length,
        data: news,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}