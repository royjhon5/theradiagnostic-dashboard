"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
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

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const userRoleString = Cookies.get("user");
  let role: string | null = null;
  if (userRoleString) {
    try {
      const user = JSON.parse(userRoleString);
      role = user.role;
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }
  const pathname = usePathname();
  const hideSidebar = ["/login"].includes(pathname) || role === "queuing";
  const { loading, setLoading } = useAppLoaderContext();

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <>
      {loading ? (
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
      ) : (
        ""
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
