import { NextResponse } from "next/server";
import { mockMatches } from "@/data/mockData";

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const modality = searchParams.get("modality");

  try {
    let matches = [...mockMatches];

    if (status && status !== "all") {
      matches = matches.filter((m) => m.status === status);
    }

    if (modality && modality !== "all") {
      matches = matches.filter(
        (m) => m.modality.toLowerCase() === modality.toLowerCase()
      );
    }

    // Sort by date (nearest first for scheduled, latest first for finished)
    matches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(
      { success: true, count: matches.length, data: matches },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}