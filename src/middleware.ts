import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sha256 } from "js-sha256";

export function middleware(req: NextRequest) {
  console.log({country:req.geo?.country});
  const userLocation = {
    ip: req.ip ?? process.env.DEVELOPER_IP ?? "unknown ip",
    city: sha256(req.geo?.city ?? process.env.DEVELOPER_CITY ?? "unknown city"),
    country: sha256(
      req.geo?.country ?? process.env.DEVELOPER_COUNTRY ?? "local location"
    ),
    region: sha256(
      req.geo?.region ?? process.env.DEVELOPER_REGION ?? "unknown region"
    ),
  };
  const res = NextResponse.next();
  res.cookies.set("user_location", JSON.stringify(userLocation));
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
