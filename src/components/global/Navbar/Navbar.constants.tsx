import {
  Building03Icon,
  Folder02Icon,
  Tag01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { MenuItem } from './navbar.d';

export const defaultMenuItems: MenuItem[] = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  {
    title: 'Features',
    url: '/features',
    items: [
      {
        title: 'Multi-Business',
        description: 'Single user, manage multiple businesses seamlessly',
        icon: (
          <HugeiconsIcon icon={Building03Icon} className="size-5 shrink-0" />
        ),
        url: '/features',
      },
      {
        title: 'Team Collaboration',
        description: 'Single business, multiple members and role permissions',
        icon: (
          <HugeiconsIcon icon={UserGroupIcon} className="size-5 shrink-0" />
        ),
        url: '/features',
      },
      {
        title: 'Account Analytics',
        description:
          'Single business, multiple accounts for financial analysis',
        icon: <HugeiconsIcon icon={Wallet02Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'Category Organization',
        description:
          'Single business, multiple categories for organized transactions',
        icon: <HugeiconsIcon icon={Tag01Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'Project Analytics',
        description:
          'Single business, multiple projects with start/end dates & P&L',
        icon: <HugeiconsIcon icon={Folder02Icon} className="size-5 shrink-0" />,
        url: '/features',
      },
      {
        title: 'People Analytics',
        description:
          'Single business, multiple people for person-level analytics',
        icon: <HugeiconsIcon icon={UserIcon} className="size-5 shrink-0" />,
        url: '/features',
      },
    ],
  },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Contact', url: '/contact' },
];
