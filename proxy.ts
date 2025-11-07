import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  const isOnProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isOnAuthRoute = authRoutes.some((route) => path.startsWith(route));

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
