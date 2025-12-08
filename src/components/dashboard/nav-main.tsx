// components/nav-main.tsx
"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    badge?: string | number; // ← NEW: for "183"
    items?: { title: string; url: string }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          defaultOpen={
            !!item.badge || item.items?.some((i) => pathname.startsWith(i.url))
          }
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={
                  pathname === item.url ||
                  item.items?.some((sub) => sub.url === pathname)
                }
              >
                <Link
                  href={item.url}
                  className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 my-1 transition-all duration-200 hover:bg-accent/50 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                >
                  {/* Icon with animation */}
                  {item.icon && (
                    <item.icon className="size-5 transition-transform group-hover:scale-110 group-data-[active=true]:text-primary" />
                  )}

                  {/* Title */}
                  <span className="flex-1 font-medium group-hover:translate-x-0.5 transition-transform">
                    {item.title}
                  </span>

                  {/* Badge with modern styling */}
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 animate-pulse">
                      {item.badge}
                    </span>
                  )}

                  {/* Chevron for expandable items */}
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="size-4 ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90 group-hover:translate-x-1" />
                  )}

                  {/* Active indicator */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full opacity-0 group-data-[active=true]:opacity-100 transition-opacity" />
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {item.items && item.items.length > 0 && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                        className="text-md font-medium"
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
