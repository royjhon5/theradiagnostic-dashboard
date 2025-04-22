import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userCookie = request.cookies.get("user");
  let user;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (err) {
      console.error(err);
    }
  }

  if (pathname === "/" || pathname === "/login") {
    if (user?.username && user?.role) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (!user) {
      if (pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
    }
  }

  const protectedRoutes: Record<string, string[]> = {
    "/client_list/registration": ["staff", "doctor"],
    "/client_list": ["staff", "doctor"],
    "/dashboard": ["admin", "accountant", "doctor"],
    "/appointment": ["admin", "doctor"],
    "/transactions": ["admin", "accountant"],
    "/lab_test_management": ["admin"],
    "/doctors": ["admin"],
    "/reports": ["accountant"],
    "/medical_records": ["doctor"],
    "/analytics": ["doctor", "accountant"],
    "/activity_history": ["staff"],
  };

  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const allowedRoles = protectedRoutes[route];
      if (!user || !allowedRoles.includes(user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/appointment/:path*",
    "/transactions/:path*",
    "/client_list/:path*",
    "/lab_test_management/:path*",
    "/doctors/:path*",
    "/transactions/:path*",
    // add more routes here if needed
  ],
};
