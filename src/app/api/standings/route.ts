import { NextResponse } from "next/server";
import { mockStandings } from "@/data/mockData";

export const revalidate = 300;

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, count: mockStandings.length, data: mockStandings },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch standings" },
      { status: 500 }
    );
  }
}