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
    badge?: string | number;
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
                  className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 my-1 transition-all duration-200 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 dark:hover:from-slate-800/30 dark:hover:to-gray-800/30 hover:shadow-sm data-[active=true]:bg-gradient-to-r data-[active=true]:from-slate-100 data-[active=true]:to-gray-100 dark:data-[active=true]:from-slate-800 dark:data-[active=true]:to-gray-800 data-[active=true]:text-slate-900 dark:data-[active=true]:text-gray-100 data-[active=true]:shadow-sm"
                >
                  {/* Icon */}
                  {item.icon && (
                    <div className="relative">
                      <item.icon className="size-5 transition-colors text-slate-600 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-gray-200 group-data-[active=true]:text-slate-900 dark:group-data-[active=true]:text-gray-100" />
                    </div>
                  )}

                  {/* Title */}
                  <span className="flex-1 font-medium transition-colors text-slate-800 dark:text-gray-300 group-data-[active=true]:text-slate-900 dark:group-data-[active=true]:text-gray-100 group-hover:text-slate-900 dark:group-hover:text-gray-200">
                    {item.title}
                  </span>

                  {/* Badge - black theme */}
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-slate-800 to-gray-800 dark:from-slate-700 dark:to-gray-700 text-white ring-1 ring-slate-200 dark:ring-gray-700 shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {/* Chevron for expandable items */}
                  {item.items && item.items.length > 0 && (
                    <ChevronRight className="size-4 ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90 text-slate-400 dark:text-gray-500 group-hover:text-slate-600 dark:group-hover:text-gray-400 group-data-[active=true]:text-slate-700 dark:group-data-[active=true]:text-gray-300" />
                  )}

                  {/* Active indicator - black bar */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-slate-900 to-gray-900 dark:from-gray-300 dark:to-gray-400 rounded-r-full opacity-0 group-data-[active=true]:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover border */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-slate-200 dark:group-hover:border-gray-700 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {item.items && item.items.length > 0 && (
              <CollapsibleContent className="mt-1 mb-2">
                <SidebarMenuSub className="ml-4 pl-2 border-l border-slate-200 dark:border-gray-800">
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                        className="text-sm font-medium hover:pl-3 transition-all duration-200 hover:bg-slate-50/50 dark:hover:bg-gray-800/50 group/subitem"
                      >
                        <Link 
                          href={subItem.url}
                          className="relative overflow-hidden"
                        >
                          {/* Dot indicator */}
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-gray-600 group-hover/subitem:bg-slate-600 dark:group-hover/subitem:bg-gray-400 transition-colors duration-300" />
                          
                          {/* Title */}
                          <span className="ml-4 text-slate-700 dark:text-gray-400 group-hover/subitem:text-slate-900 dark:group-hover/subitem:text-gray-200 group-data-[active=true]:text-slate-900 dark:group-data-[active=true]:text-gray-100 transition-colors duration-200">
                            {subItem.title}
                          </span>
                          
                          {/* Active state */}
                          {pathname === subItem.url && (
                            <>
                              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-gray-300" />
                              <span className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-gray-800/50 opacity-50" />
                            </>
                          )}
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