import { ChevronRight } from '@hugeicons/core-free-icons';
import { Link, useLocation } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible/Collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar/Sidebar';

import { SIDEBAR_MENU_GROUPS } from './sidebar.constant';

// ─── Component ───────────────────────────────────────────────────────────────

export function AppSidebarContent() {
  const { pathname, search } = useLocation();
  const currentUrl = `${pathname}${search}`;

  return (
    <>
      {SIDEBAR_MENU_GROUPS.map(group => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map(item =>
              item.items && item.items.length > 0 ? (
                <Collapsible
                  key={item.name}
                  asChild
                  defaultOpen={pathname.includes(item.route)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.tooltip}
                        isActive={pathname.includes(item.route)}
                      >
                        <HugeiconsIcon icon={item.hugeicon} />
                        <span>{item.name}</span>
                        <HugeiconsIcon
                          icon={ChevronRight}
                          className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map(subItem => (
                          <SidebarMenuSubItem key={subItem.name}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={currentUrl === subItem.route}
                            >
                              <Link to={subItem.route}>
                                <span>{subItem.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.tooltip}
                    isActive={pathname.includes(item.route)}
                    asChild
                  >
                    <Link to={item.route}>
                      <HugeiconsIcon icon={item.hugeicon} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
