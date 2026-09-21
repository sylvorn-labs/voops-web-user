import type { IconSvgElement } from '@hugeicons/react';

export type SidebarSubItem = {
  name: string;
  route: string;
};

export type SidebarMenuItem = {
  name: string;
  tooltip: string;
  route: string;
  hugeicon: IconSvgElement;
  isActive?: boolean;
  items?: SidebarSubItem[];
};

export type SidebarMenuGroup = {
  label: string;
  items: SidebarMenuItem[];
};
