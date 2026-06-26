import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("admin")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Proteger rotas de admin
  if (request.nextUrl.pathname.startsWith("/admin") && !isAdmin && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirecionar para dashboard se já estiver logado
  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};