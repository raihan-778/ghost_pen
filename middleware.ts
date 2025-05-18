import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const url = request.nextUrl;
  return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "dashboard/:path*", //here :path* means any path after dashboard will be matched for middleware
    "verify?:path",
  ],
};
