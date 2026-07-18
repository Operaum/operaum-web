import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { authRateLimit, getClientIp } from "@/lib/rate-limit";

export async function proxy(request: NextRequest) {
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isLoginAttempt = request.nextUrl.pathname.startsWith("/api/auth/callback/credentials");

  if (isLoginAttempt) {
    const ip = getClientIp(request);
    const { success } = await authRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in a minute." },
        { status: 429 }
      );
    }
  }

  if (isDashboardRoute) {
    const session = await auth();

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/callback/credentials"],
};
