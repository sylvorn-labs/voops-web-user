import {
  DashboardCircleIcon,
  Tag01Icon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';

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
      {
        name: 'Accounts',
        tooltip: 'Manage financial accounts',
        route: `${BASE}/accounts`,
        hugeicon: Wallet02Icon,
      },
      {
        name: 'Categories',
        tooltip: 'Manage categories',
        route: `${BASE}/categories`,
        hugeicon: Tag01Icon,
      },
    ],
  },
];
