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

  // Handle login page redirect if already logged in
  if (pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          user.role.toLowerCase() === "staff"
            ? "/appointment"
            : user.role.toLowerCase() === "accountant"
              ? "/transactions"
              : user.role.toLowerCase() === "queuing"
                ? "/queue-screen"
                : "/dashboard",
          request.url
        )
      );
    }
    return NextResponse.next();
  }

  // Handle root path redirect
  if (pathname === "/") {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.redirect(
      new URL(
        user.role.toLowerCase() === "staff"
          ? "/appointment"
          : user.role.toLowerCase() === "accountant"
            ? "/transactions"
            : user.role.toLowerCase() === "queuing"
              ? "/queue-screen"
              : "/dashboard",
        request.url
      )
    );
  }

  // Check if user is logged in for all other routes
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based path restrictions
  if (
    pathname.startsWith("/dashboard") &&
    user?.role.toLowerCase() === "staff"
  ) {
    return NextResponse.redirect(new URL("/appointment", request.url));
  }

  if (
    pathname.startsWith("/dashboard") &&
    user?.role.toLowerCase() === "accountant"
  ) {
    return NextResponse.redirect(new URL("/transactions", request.url));
  }

  // Add this new check for queuing users
  if (
    pathname.startsWith("/dashboard") &&
    user?.role.toLowerCase() === "queuing"
  ) {
    return NextResponse.redirect(new URL("/queue-screen", request.url));
  }

  // Protected routes configuration
  const protectedRoutes: Record<string, string[]> = {
    "/queue-screen": ["queuing"],
    "/client-list/registration": ["staff", "doctor", "admin"],
    "/client-list": ["staff", "doctor", "admin"],
    "/settings/test-package": ["admin"],
    "/settings/laboratory-test": ["admin"],
    "/settings/user-management": ["admin"],
    "/settings/report-settings": ["admin"],
    "/settings": ["admin", "doctor", "accountant", "staff"],
    "/appointment/create-assessment": ["admin", "doctor", "staff"],
    "/appointment": ["admin", "doctor", "staff"],
    "/transactions/process-transaction": ["admin", "accountant"],
    "/transactions/transaction-details": ["admin", "accountant"],
    "/transactions": ["admin", "accountant"],
    "/dashboard": ["admin", "doctor"],
    "/doctors": ["admin"],
    "/reports": ["accountant", "admin"],
    "/medical-records": ["doctor", "admin"],
    "/analytics": ["doctor", "accountant", "admin"],
    "/activity-history": ["staff", "admin"],
  };

  // Check protected routes
  let isProtectedRoute = false;
  let allowedRoles: string[] = [];

  for (const route in protectedRoutes) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      isProtectedRoute = true;
      allowedRoles = protectedRoutes[route];
      break;
    }
  }

  if (isProtectedRoute) {
    if (!allowedRoles.includes(user.role.toLowerCase())) {
      console.log(
        `Access denied for ${user.role} to ${pathname}. Allowed roles:`,
        allowedRoles
      );
      return NextResponse.redirect(new URL("/unauthorized", request.url));
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
    "/queue-screen",
    "/queue-screen/:path*",
  ],
};
