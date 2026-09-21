import {
  Contact01Icon,
  Folder02Icon,
  Home01Icon,
  Tag01Icon,
  TransactionIcon,
  UserGroupIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';

import type { SidebarMenuGroup } from './sidebar';

export const BASE = '/dashboard';

export const SIDEBAR_MENU_GROUPS: SidebarMenuGroup[] = [
  {
    label: 'Overview',
    items: [
      {
        name: 'Overview',
        tooltip: 'View overview',
        route: `${BASE}`,
        hugeicon: Home01Icon,
      },
    ],
  },
  {
    label: 'Finance',
    items: [
      {
        name: 'Transactions',
        tooltip: 'Manage transactions',
        route: `${BASE}/transactions`,
        hugeicon: TransactionIcon,
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
  {
    label: 'Business',
    items: [
      {
        name: 'Projects',
        tooltip: 'Manage projects',
        route: `${BASE}/projects`,
        hugeicon: Folder02Icon,
      },
      {
        name: 'Parties',
        tooltip: 'Manage parties',
        route: `${BASE}/parties`,
        hugeicon: Contact01Icon,
      },
      {
        name: 'Members',
        tooltip: 'Manage team members',
        route: `${BASE}/members`,
        hugeicon: UserGroupIcon,
      },
    ],
  },
];
