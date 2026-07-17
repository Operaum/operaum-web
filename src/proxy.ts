import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO (Phase 4): this is a "thin" check only — verify a session cookie exists.
// Do NOT perform full token verification or database lookups here.
// Real, authoritative session validation belongs in Server Components
// or Server Actions once authentication is implemented.
export function proxy(request: NextRequest) {
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    // Placeholder: no real session check yet.
    // When auth is implemented, check for a session cookie here
    // and redirect to /login if it's missing.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
