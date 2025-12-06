"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Shield, // optional: for admin icon
  Users,
  Lock,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { useUser } from "../../context/UserContext";

// Define sidebar data per role
const sidebarConfig = {
  user: {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "/playground",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "History", url: "/playground/history" },
          { title: "Starred", url: "/playground/starred" },
        ],
      },
      {
        title: "Models",
        url: "/models",
        icon: Bot,
        items: [
          { title: "Genesis", url: "/models/genesis" },
          { title: "Explorer", url: "/models/explorer" },
        ],
      },
      {
        title: "Documentation",
        url: "/docs",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "/docs/intro" },
          { title: "Get Started", url: "/docs/start" },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        items: [
          { title: "General", url: "/settings/general" },
          { title: "Billing", url: "/settings/billing" },
        ],
      },
    ],
    projects: [
      { name: "Design Engineering", url: "/projects/design", icon: Frame },
      { name: "Sales & Marketing", url: "/projects/sales", icon: PieChart },
      { name: "Travel App", url: "/projects/travel", icon: Map },
    ],
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/john.jpg",
    },
  },

  admin: {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Admin Console",
        logo: Shield,
        plan: "Admin",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: PieChart,
        isActive: true,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        items: [
          { title: "All Users", url: "/admin/users" },
          { title: "Roles & Permissions", url: "/admin/roles" },
          { title: "Audit Logs", url: "/admin/logs" },
        ],
      },
      {
        title: "Models Management",
        url: "/admin/models",
        icon: Bot,
        items: [
          { title: "Deployed Models", url: "/admin/models/deployed" },
          { title: "Model Registry", url: "/admin/models/registry" },
          { title: "Monitoring", url: "/admin/models/monitor" },
        ],
      },
      {
        title: "System",
        url: "/admin/system",
        icon: Settings2,
        items: [
          { title: "Security", url: "/admin/system/security" },
          { title: "Backups", url: "/admin/system/backups" },
          { title: "API Keys", url: "/admin/system/api-keys" },
          { title: "Rate Limits", url: "/admin/system/limits" },
        ],
      },
      {
        title: "Playground",
        url: "/playground",
        icon: SquareTerminal,
      },
    ],
    projects: [
      { name: "Admin Panel v2", url: "/projects/admin-v2", icon: Lock },
      {
        name: "Monitoring Dashboard",
        url: "/projects/monitoring",
        icon: PieChart,
      },
    ],
    user: {
      name: "Admin User",
      email: "admin@acme.com",
      avatar: "/avatars/admin.jpg",
    },
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  console.log(user?.role)
  const role = user?.role === "admin" ? "admin" : "user";
  const data = sidebarConfig["admin"];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
