import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/cart",
    "/home",
    "/profile",
    "/product/:path*",
    "/categories",
    "/brand",
    "/orders",
    "/wishlist",
    "/checkout/:path*",
  ],
};
