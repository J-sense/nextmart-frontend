"use client";

import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  ShoppingBag,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Logo from "@/components/ui/logo";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/user/dashboard", icon: SquareTerminal },
    {
      title: "Order",
      url: "/order",
      icon: ShoppingBag,
      badge: "183", 
    },
    {
      title: "Shop",
      url: "/user/shop/category",
      icon: SquareTerminal,
      items: [
        { title: "Manage Categories", url: "/user/shop/category" },
        { title: "Manage Products", url: "/user/shop/product" },
        { title: "Manage Brands", url: "/user/shop/brands" },
      ],
    },
    { title: "Models", url: "/models", icon: Bot },
    { title: "Documentation", url: "/docs", icon: BookOpen },
    { title: "Settings", url: "/user/settings", icon: Settings2 },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6 ">
        <Logo />
      </div>
      <SidebarHeader />
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
