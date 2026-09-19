import { DashboardCircleIcon } from '@hugeicons/core-free-icons';

import type { SidebarMenuGroup } from './sidebar';

export const BASE = '/dashboard';

export const SIDEBAR_MENU_GROUPS: SidebarMenuGroup[] = [
  {
    label: 'General',
    items: [
      {
        name: 'Dashboard',
        tooltip: 'View dashboard',
        route: `${BASE}`,
        hugeicon: DashboardCircleIcon,
      },
    ],
  },
];
