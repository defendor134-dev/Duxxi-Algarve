// ============================================================
// Sporting CP - Next.js Middleware
// Handles: Rate limiting, Security headers, Auth redirects
// ============================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting store (in-memory, use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 100; // max requests per window

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ---- Security Headers ----
  const headers = response.headers;

  // HSTS (HTTP Strict Transport Security)
  headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY");

  // XSS Protection
  headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Content Security Policy
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://widgets.api-sports.io",
      "style-src 'self' 'unsafe-inline' https://*.googleapis.com",
      "img-src 'self' data: blob: https://*.unsplash.com https://*.api-sports.io",
      "font-src 'self' https://*.gstatic.com",
      "connect-src 'self' https://*.api-sports.io https://*.record.pt https://*.abola.pt https://*.ojogo.pt",
      "frame-src 'none'",
      "object-src 'none'",
    ].join("; ")
  );

  // ---- Rate Limiting ----
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const rateData = rateLimit.get(ip);

  if (rateData) {
    if (now > rateData.resetTime) {
      // Reset window
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else if (rateData.count >= RATE_LIMIT_MAX) {
      // Rate limit exceeded
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          message: "Tentaste aceder a esta página demasiadas vezes. Por favor, aguarda um minuto.",
          retryAfter: Math.ceil((rateData.resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((rateData.resetTime - now) / 1000)),
          },
        }
      );
    } else {
      rateLimit.set(ip, { ...rateData, count: rateData.count + 1 });
    }
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  }

  // ---- CORS for API routes ----
  if (request.nextUrl.pathname.startsWith("/api/")) {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers });
    }
  }

  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Apply to all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest).*)",
  ],
};