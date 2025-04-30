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
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const isLoggedIn = !!(user?.username && user?.role);

  if (pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          user.role === "staff"
            ? "/appointment"
            : user.role === "accountant"
              ? "/transactions"
              : "/dashboard",
          request.url
        )
      );
    }
    return NextResponse.next();
  }

  if (pathname === "/") {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.redirect(
      new URL(
        user.role === "staff"
          ? "/appointment"
          : user.role === "accountant"
            ? "/transactions"
            : "/dashboard",
        request.url
      )
    );
  }

  if (pathname.startsWith("/dashboard") && user?.role === "staff") {
    return NextResponse.redirect(new URL("/appointment", request.url));
  }

  if (pathname.startsWith("/dashboard") && user?.role === "accountant") {
    return NextResponse.redirect(new URL("/transactions", request.url));
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const protectedRoutes: Record<string, string[]> = {
    "/client-list/registration": ["staff", "doctor"],
    "/client-list": ["staff", "doctor"],
    "/settings/test-package": ["admin"],
    "/settings/laboratory-test": ["admin"],
    "/settings/user-management": ["admin"],
    "/settings": ["admin", "doctor", "accountant", "staff"],
    "/appointment/create-assessment": ["admin", "doctor", "staff"],
    "/appointment": ["admin", "doctor", "staff"],
    "/transactions/process-transaction": ["admin", "accountant"],
    "/transactions/transaction-details": ["admin", "accountant"],
    "/transactions": ["admin", "accountant"],
    "/dashboard": ["admin", "doctor"],
    "/doctors": ["admin"],
    "/reports": ["accountant"],
    "/medical-records": ["doctor"],
    "/analytics": ["doctor", "accountant"],
    "/activity-history": ["staff"],
  };

  for (const route in protectedRoutes) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      if (!protectedRoutes[route].includes(user.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      break;
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
    "/client-list/:path*",
    "/lab-test-management/:path*",
    "/doctors/:path*",
    "/reports/:path*",
    "/medical-records/:path*",
    "/analytics/:path*",
    "/activity-history/:path*",
    "/settings/:path*",
  ],
};
