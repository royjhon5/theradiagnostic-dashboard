"use client";

import type React from "react";

import { usePathname } from "next/navigation";
import type { FC } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "./ui/badge";

interface NavItem {
  title: string;
  url: string;
  icon?: FC<React.SVGProps<SVGSVGElement>>;
  items?: {
    title: string;
    url: string;
    badgeCount?: number;
  }[];
}

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            const hasActiveChild = item.items?.some((child) =>
              pathname.startsWith(child.url)
            );
            const shouldExpand = isActive || hasActiveChild;
            if (item.items && item.items.length > 0) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={shouldExpand}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`mb-1 cursor-pointer text-md h-8 transition-all duration-200 ease-in-out rounded-md px-2 ${
                          isActive || hasActiveChild
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.url;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubActive}
                                className="transition-all duration-200 ease-in-out flex items-center justify-between"
                              >
                                <Link
                                  href={subItem.url}
                                  className="flex w-full justify-between items-center"
                                >
                                  <span>{subItem.title}</span>
                                  {subItem.badgeCount !== undefined &&
                                    subItem.badgeCount > 0 && (
                                      <Badge
                                        className="rounded-xl"
                                        variant="default"
                                      >
                                        {subItem.badgeCount}
                                      </Badge>
                                    )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`mb-1 cursor-pointer text-md h-8 transition-all duration-200 ease-in-out rounded-md px-2 ${
                    isActive || hasActiveChild
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
