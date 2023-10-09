import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/plan/:path*", "/me/:path*"],
};

const secret = process.env.NEXTAUTH_SECRET;
const url = process.env.NEXTAUTH_URL;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret, raw: true });
  if (!token) {
    return NextResponse.redirect(`${url}/auth`);
  }
}
