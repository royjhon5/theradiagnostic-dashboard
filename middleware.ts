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
  console.log("User from cookie:", user);

  const isLoggedIn = !!(user?.username && user?.role);

  // Handle login page redirect if already logged in
  if (pathname === "/login") {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(
          user.role.toLowerCase() === "RECEPTIONIST"
            ? "/appointment"
            : user.role.toLowerCase() === "RECEPTIONIST"
              ? "/transactions"
              : user.role.toLowerCase() === "QUEUING"
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
        user.role.toLowerCase() === "RECEPTIONIST"
          ? "/appointment"
          : user.role.toLowerCase() === "RECEPTIONIST"
            ? "/transactions"
            : user.role.toLowerCase() === "QUEUING"
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
    user?.role.toLowerCase() === "RECEPTIONIST"
  ) {
    return NextResponse.redirect(new URL("/appointment", request.url));
  }

  if (
    pathname.startsWith("/dashboard") &&
    user?.role.toLowerCase() === "RECEPTIONIST"
  ) {
    return NextResponse.redirect(new URL("/transactions", request.url));
  }

  // Add this new check for queuing users
  if (
    pathname.startsWith("/dashboard") &&
    user?.role.toLowerCase() === "QUEUING"
  ) {
    return NextResponse.redirect(new URL("/queue-screen", request.url));
  }

  // Protected routes configuration
  const protectedRoutes: Record<string, string[]> = {
    "/queue-screen": ["QUEUING"],
    "/client-list/registration": ["RECEPTIONIST", "DOCTOR", "ADMIN"],
    "/client-list": ["RECEPTIONIST", "DOCTOR", "ADMIN"],
    "/settings/test-package": ["ADMIN"],
    "/settings/laboratory-test": ["ADMIN"],
    "/settings/user-management": ["ADMIN"],
    "/settings/report-settings": ["ADMIN"],
    "/settings": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
    "/appointment/create-assessment": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
    "/appointment": ["ADMIN", "DOCTOR", "RECEPTIONIST"],
    "/transactions/process-transaction": ["ADMIN", "RECEPTIONIST"],
    "/transactions/transaction-details": ["ADMIN", "RECEPTIONIST"],
    "/transactions": ["ADMIN", "RECEPTIONIST"],
    "/dashboard": ["ADMIN", "DOCTOR"],
    "/doctors": ["ADMIN"],
    "/reports": ["RECEPTIONIST", "ADMIN"],
    "/medical-records": ["DOCTOR", "ADMIN"],
    "/analytics": ["DOCTOR", "RECEPTIONIST", "ADMIN"],
    "/activity-history": ["RECEPTIONIST", "ADMIN"],
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
    if (!allowedRoles.includes(user.role)) {
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
