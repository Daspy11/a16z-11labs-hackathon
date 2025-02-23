'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { sidebarConfig } from '@/lib/sidebarConfig';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-[48px] px-[16px]">
        <div className="flex h-full items-center justify-between px-0.5">
          <Link href="/">
            <Logo className="dark:text-white opacity-90 transition-opacity hover:opacity-100" height={14} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarConfig.map((demo) => (
          <SidebarGroup key={demo.name}>
            <SidebarGroupLabel>{demo.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {demo.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === `/${item.slug}`} status={item.status}>
                      <a href={`/${item.slug}`} className="opacity-85 transition-opacity hover:opacity-100">
                        {item.icon && <item.icon className="!h-[15px] !w-[15px] stroke-[2.5]" />}
                        {item.name}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
