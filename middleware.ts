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
          user.role === "RECEPTIONIST"
            ? "/client-registration"
            : user.role === "NURSE"
              ? "/results-management/client-receiving"
              : user.role === "MEDTECH"
                ? "/results-management/client-result-entry"
                : user.role === "QUEUING"
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
        user.role === "RECEPTIONIST"
          ? "/client-registration"
          : user.role === "NURSE"
            ? "/results-management/client-receiving"
            : user.role === "MEDTECH"
              ? "/results-management/client-result-entry"
              : user.role === "QUEUING"
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
  if (pathname.startsWith("/dashboard") && user?.role === "RECEPTIONIST") {
    return NextResponse.redirect(new URL("/client-registration", request.url));
  }

  if (pathname.startsWith("/dashboard") && user?.role === "RECEPTIONIST") {
    return NextResponse.redirect(new URL("/client-registration", request.url));
  }

  if (pathname.startsWith("/dashboard") && user?.role === "MEDTECH") {
    return NextResponse.redirect(
      new URL("/results-management/client-result-entry", request.url)
    );
  }

  if (pathname.startsWith("/dashboard") && user?.role === "NURSE") {
    return NextResponse.redirect(
      new URL("/results-management/client-receiving", request.url)
    );
  }

  // Add this new check for queuing users
  if (pathname.startsWith("/dashboard") && user?.role === "QUEUING") {
    return NextResponse.redirect(new URL("/queue-screen", request.url));
  }

  // Protected routes configuration
  const protectedRoutes: Record<string, string[]> = {
    "/queue-screen": ["QUEUING"],
    "/queue-management": ["RECEPTIONIST", "ADMIN"],
    "/client-list/registration": ["RECEPTIONIST", "DOCTOR", "ADMIN"],
    "/client-list": ["RECEPTIONIST", "DOCTOR", "ADMIN", "MEDTECH", "RADTECH"],
    "/result-management/client-receiving": ["ADMIN", "MEDTECH", "RADTECH"],
    "/result-management/client-result-entry": ["ADMIN", "MEDTECH", "RADTECH"],
    "/result-management/client-evaluation": ["ADMIN", "MEDTECH", "RADTECH"],
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
    "/queue-management",
    "/queue-management/:path*",
    "/result-management",
    "/resul-management/:path*",
  ],
};
