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
  LayoutDashboard,
  ChartNoAxesCombined,
  Settings,
  History,
  BriefcaseMedical,
  TestTube,
  CalendarCheck,
  Calendar,
  ScreenShare,
  FolderKanban,
  UserPlus,
  FileSearch,
} from "lucide-react";
import useGetCountNowServing from "@/app/queue-screen/hooks/useGetCountNowServing";
import useGetClient from "@/app/results-management/client-result-entry/hooks/useGetClient";
import { AppSocket } from "@/lib/socketClient";
import { Socket } from "socket.io-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    username: "Unknown User",
    avatar: "/default-avatar.png",
    role: "admin",
    email: "",
  });
  const { countData, fetchData } = useGetCountNowServing();
  const { countResultEnry, refetchData } = useGetClient();
  const socketRef = React.useRef<Socket | null>(null);
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

  React.useEffect(() => {
    const socket = AppSocket();
    if (!socket) return;
    socketRef.current = socket;
    socket.on("ReceiveClientReceiving", fetchData);
    socket.on("ReceiveClientResultEntry", refetchData);
    return () => {
      socket.off("ReceiveClientReceiving", fetchData);
      socket.off("ReceiveClientResultEntry", refetchData);
    };
  }, [fetchData, refetchData]);
  const fullNavMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      hideForRoles: ["staff", "accountant"],
    },
    {
      title: "Client Management",
      url: "/content",
      icon: UserPlus,
      items: [
        {
          title: "Registration",
          url: "/client-registration",
          hideForRoles: ["accountant"],
        },
        {
          title: "List",
          url: "/client-list",
          hideForRoles: ["accountant"],
        },
      ],
    },
    {
      title: "Results Management",
      url: "/results-management",
      icon: FolderKanban,
      items: [
        {
          title: "Client Receiving",
          url: "/results-management/client-receiving",
          hideForRoles: ["staff", "doctor", "accountant"],
          badgeCount: countData,
        },
        {
          title: "Client Result Entry",
          url: "/results-management/client-result-entry",
          hideForRoles: ["staff", "doctor", "accountant"],
          badgeCount: countResultEnry,
        },
        {
          title: "Result Evaluation",
          url: "/results-management/result-evaluation",
          hideForRoles: ["staff", "doctor", "accountant"],
          badgeCount: 0,
        },
        {
          title: "Final Result Authorization",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
      ],
    },
    {
      title: "Enquiry & Reporting",
      url: "/content",
      icon: FileSearch,
      items: [
        {
          title: "Find Patient Result",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
        {
          title: "Daily Order Summary",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
        {
          title: "Daily Result Summary",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
        {
          title: "Repeat Tests Report",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
      ],
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
      title: "Analytics",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Lab Test Management",
      url: "/content",
      icon: TestTube,
      items: [
        {
          title: "Individual Test",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
        {
          title: "Laboratory Test Packages",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
        {
          title: "Recent Client Lab Request",
          url: "#",
          hideForRoles: ["staff", "doctor", "accountant"],
        },
      ],
    },
    {
      title: "Medical Records",
      url: "#",
      icon: Calendar,
      hideForRoles: ["staff", "accountant"],
    },
    {
      title: "Queue Management",
      url: "/queue-management",
      icon: ScreenShare,
    },
    {
      title: "Calendar",
      url: "/appointment",
      icon: CalendarCheck,
      hideForRoles: ["accountant"],
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
