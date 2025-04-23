import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user");

  let user = null;
  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (err) {
      console.error("Failed to parse user cookie:", err);
    }
  }

  const isLoggedIn = !!(user?.username && user?.role);

  if (pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedRoutes: Record<string, string[]> = {
    "/client_list/registration": ["staff", "doctor"],
    "/client_list": ["staff", "doctor"],
    "/settings/test_package": ["admin", "doctor", "accountant", "staff"],
    "/settings/laboratory_test": ["admin", "doctor", "accountant", "staff"],
    "/settings": ["admin", "doctor", "accountant", "staff"],
    "/dashboard": ["admin", "accountant", "doctor"],
    "/appointment": ["admin", "doctor"],
    "/transactions": ["admin", "accountant"],
    "/doctors": ["admin"],
    "/reports": ["accountant"],
    "/medical_records": ["doctor"],
    "/analytics": ["doctor", "accountant"],
    "/activity_history": ["staff"],
  };

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  for (const route in protectedRoutes) {
    if (pathname === route || pathname.startsWith(route + "/")) {
      const allowedRoles = protectedRoutes[route];
      if (!allowedRoles.includes(user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/appointment/:path*",
    "/transactions/:path*",
    "/client_list/:path*",
    "/lab_test_management/:path*",
    "/doctors/:path*",
    "/reports/:path*",
    "/medical_records/:path*",
    "/analytics/:path*",
    "/activity_history/:path*",
    "/settings/:path*",
  ],
};
