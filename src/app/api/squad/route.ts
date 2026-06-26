// ============================================================
// API Route: /api/squad
// Fetches the squad list from the data service.
// ============================================================

import { NextResponse } from "next/server";
import { getSquad } from "@/lib/services/data-service";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const position = searchParams.get("position") || undefined;
  const query = searchParams.get("query") || undefined;

  try {
    // Pass filters down to the data service
    const squad = await getSquad({ position, query });

    return NextResponse.json({ success: true, data: squad });
  } catch (error) {
    console.error("Error fetching squad:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch squad" }, { status: 500 });
  }
}