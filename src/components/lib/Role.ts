// lib/roles.ts
export type Role = "admin" | "manager" | "user" | "guest";

export type MenuItem = {
  name: string;
  href: string;
  icon?: string; // you can add icons later
};

export const ROLE_CONFIG: Record<Role, { sidebar: MenuItem[] }> = {
  admin: {
    sidebar: [
      { name: "Overview", href: "/dashboard" },
      { name: "Users", href: "/dashboard/users" },
      { name: "Analytics", href: "/dashboard/analytics" },
      { name: "Settings", href: "/dashboard/settings" },
    ],
  },
  manager: {
    sidebar: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Team", href: "/dashboard/team" },
      { name: "Reports", href: "/dashboard/reports" },
      { name: "Tasks", href: "/dashboard/tasks" },
    ],
  },
  user: {
    sidebar: [
      { name: "My Dashboard", href: "/dashboard" },
      { name: "Tasks", href: "/dashboard/tasks" },
      { name: "Profile", href: "/dashboard/profile" },
    ],
  },
  guest: {
    sidebar: [{ name: "Welcome", href: "/dashboard" }],
  },
};
