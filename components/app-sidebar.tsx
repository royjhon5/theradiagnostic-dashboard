"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import newlogo from "../public/logo/logo.png";
import { OtherMenu } from "./other-menu";
import {
  BadgeDollarSign,
  ClipboardMinus,
  LayoutDashboard,
  ChartNoAxesCombined,
  Settings,
  History,
  BriefcaseMedical,
  TestTube,
  CalendarCheck,
  ListCheck,
  Calendar,
  ScreenShare,
} from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    username: "Unknown User",
    avatar: "/default-avatar.png",
    role: "admin",
    email: "",
  });
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user from cookie:", error);
      }
    };
    fetchUser();
  }, []);
  const fullNavMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      hideForRoles: ["staff", "accountant"],
    },
    {
      title: "Appointments",
      url: "/appointment",
      icon: CalendarCheck,
      hideForRoles: ["accountant"],
    },
    {
      title: "Lab Test Management",
      url: "/lab-test-management",
      icon: TestTube,
      hideForRoles: ["staff", "doctor", "accountant"],
    },
    {
      title: "Doctors",
      url: "/doctors",
      icon: BriefcaseMedical,
      hideForRoles: ["staff", "doctor", "accountant"],
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: BadgeDollarSign,
      hideForRoles: ["staff", "doctor"],
    },
    {
      title: "Reports",
      url: "#",
      icon: ClipboardMinus,
      hideForRoles: ["staff", "doctor"],
    },
    {
      title: "Client List",
      url: "/client-list",
      icon: ListCheck,
      hideForRoles: ["accountant"],
    },
    {
      title: "Medical Records",
      url: "#",
      icon: Calendar,
      hideForRoles: ["staff", "accountant"],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartNoAxesCombined,
      hideForRoles: ["staff"],
    },
    {
      title: "Queue Management",
      url: "/queue-management",
      icon: ScreenShare,
    },
  ];

  const OterMenuMain = [
    {
      title: "Activity History",
      url: "#",
      icon: History,
      hideForRoles: ["doctor", "accountant"],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  const navMain = fullNavMain.filter(
    (item) => !item.hideForRoles?.includes(user.role)
  );

  const otherMenu = OterMenuMain.filter(
    (item) => !item.hideForRoles?.includes(user.role)
  );
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <Image
                  title="theralogo logo"
                  alt="theralogo logo"
                  src={newlogo}
                  width={20}
                  height={20}
                  priority
                />
                <span className="text-lg font-semibold text-blue-500 ml-2">
                  TheraDiagnostic
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <OtherMenu items={otherMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
