import { getCurrentUser } from "./src/services/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
type role = keyof typeof roleBaseProtectedRoutes;
const authRoutes = ["/register", "/login"];
const roleBaseProtectedRoutes: Record<string, RegExp[]> = {
  user: [/^\/user/,/^\/create-shop/],
  admin: [/^\/admin/],
};
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3001/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  if (userInfo?.role && roleBaseProtectedRoutes[userInfo?.role as role]) {
    const routes = roleBaseProtectedRoutes[userInfo?.role];
    if (routes) {
      const isAllowed = routes.some((route) => pathname.match(route));
      if (isAllowed) {
        return NextResponse.next();
      }
    }
  }
  return NextResponse.redirect(new URL(`/`, request.url));
}
export const config = {
  matcher: [ "/user", "/user/:page","/create-shop"],
};
