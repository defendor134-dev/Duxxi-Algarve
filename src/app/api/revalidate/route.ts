// ============================================================
// API Route: /api/revalidate
// Used by Vercel Cron Jobs to periodically revalidate pages
// ============================================================

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.REVALIDATION_TOKEN;

  // Basic security - in production, use a proper token
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate all main pages
    const pathsToRevalidate = ["/", "/jogos", "/noticias", "/modalidades", "/plantel"];

    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    // Revalidate cached data by tags
    revalidateTag("news");
    revalidateTag("games");
    revalidateTag("standings");
    revalidateTag("squad");

    return NextResponse.json({
      success: true,
      revalidated: pathsToRevalidate.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}