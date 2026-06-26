import { NextResponse } from "next/server";
import { getTransfers } from "@/lib/services/data-service";

export const revalidate = 300;

export async function GET() {
  try {
    const transfers = await getTransfers();

    return NextResponse.json(
      { success: true, count: transfers.length, data: transfers },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching transfers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transfers" },
      { status: 500 }
    );
  }
}
