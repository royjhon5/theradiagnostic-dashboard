"use client";

import * as React from "react";
import {
  IconCalendar,
  IconCalendarCheck,
  IconDashboard,
  IconListCheck,
  IconMoneybag,
  IconPrescription,
  IconStethoscope,
  IconVaccine,
} from "@tabler/icons-react";

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
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import newlogo from "../public/logo/logo.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<null | {
    user_metadata?: { full_name?: string; email?: string; avatar_url?: string };
  }>(null);
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);
  const data = {
    user: {
      name: user?.user_metadata?.full_name ?? "Unknown User",
      email: user?.user_metadata?.email ?? "No Email",
      avatar: user?.user_metadata?.avatar_url ?? "/default-avatar.png",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Appointments",
        url: "/appointment",
        icon: IconCalendarCheck,
      },
      {
        title: "Doctors",
        url: "#",
        icon: IconStethoscope,
      },
      {
        title: "Pharmacy Data",
        url: "#",
        icon: IconPrescription,
      },
      {
        title: "Medical Records",
        url: "#",
        icon: IconVaccine,
      },
      {
        title: "Client List",
        url: "/client_list",
        icon: IconListCheck,
      },
      {
        title: "Calendar",
        url: "#",
        icon: IconCalendar,
      },
      {
        title: "Accounting",
        url: "#",
        icon: IconMoneybag,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
