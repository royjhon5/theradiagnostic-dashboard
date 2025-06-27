"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAppLoaderContext } from "../providers/app-loader-provider";
import { Backdrop } from "../backdrop";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

interface LayoutWrapperProps {
  children: ReactNode;
}

interface UserData {
  role?: string;
  // Add other user properties if needed
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const { loading, setLoading } = useAppLoaderContext();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const user: UserData = JSON.parse(userCookie);
        setUserRole(user?.role?.toLowerCase() || null);
      }
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }, []);

  // Determine if sidebar should be hidden
  const hideSidebar =
    ["/login", "/queue-screen"].includes(pathname) ||
    (userRole === "QUEUING" && pathname !== "/queue-screen");

  // Special case: queuing users should only see queue-screen
  if (userRole === "QUEUING" && !pathname.startsWith("/queue-screen")) {
    window.location.href = "/queue-screen";
    return null;
  }

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          onClose={() => setLoading(false)}
          variant="blur"
          className="z-50"
        >
          <div className="flex flex-row h-full justify-center items-center animate-pulse gap-2">
            <Loader2 className="animate-spin" />
            Please Wait
            <span className="ml-2 flex space-x-1">
              <span className="dot dot1" />
              <span className="dot dot2" />
              <span className="dot dot3" />
            </span>
          </div>
        </Backdrop>
      )}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-[#F0F8FF] dark:bg-black">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
