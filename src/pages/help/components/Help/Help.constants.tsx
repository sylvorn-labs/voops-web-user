import {
  Building03Icon,
  FlashIcon,
  Folder02Icon,
  Tag01Icon,
  UserGroupIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { HelpCategory, PopularTopic } from './help.d';

export const defaultCategories: HelpCategory[] = [
  {
    icon: (
      <HugeiconsIcon icon={Building03Icon} className="text-primary size-5" />
    ),
    title: 'Multi-Business Setup',
    description:
      'Create, isolate, and switch across multiple company workspaces.',
    articles: 8,
    href: '#',
  },
  {
    icon: (
      <HugeiconsIcon icon={UserGroupIcon} className="text-primary size-5" />
    ),
    title: 'Team & Permissions',
    description:
      'Invite members, assign roles, and configure view-only access.',
    articles: 10,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Wallet02Icon} className="text-primary size-5" />,
    title: 'Accounts & Banking',
    description:
      'Manage bank accounts, cash registers, and multi-currency balances.',
    articles: 6,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Folder02Icon} className="text-primary size-5" />,
    title: 'Project Budgets & P&L',
    description:
      'Track client milestones, calculate real margins, and log payouts.',
    articles: 9,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Tag01Icon} className="text-primary size-5" />,
    title: 'Categories & Tax Tags',
    description:
      'Organize expenses, automate write-offs, and generate tax reports.',
    articles: 12,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={FlashIcon} className="text-income size-5" />,
    title: 'Mobile Sync & Flutter',
    description:
      'Sync real-time receipts between Flutter mobile apps and React web.',
    articles: 7,
    href: '#',
  },
];

export const defaultTopics: PopularTopic[] = [
  { title: 'How do I add a second business entity?', href: '#' },
  { title: 'Inviting an external accountant with read-only access', href: '#' },
  { title: 'Exporting audit-ready CSV & PDF tax reports', href: '#' },
  { title: 'Connecting Flutter mobile app with Supabase cloud', href: '#' },
  { title: 'Configuring project milestone budgets and P&L', href: '#' },
  { title: 'Resetting 2FA or changing workspace owner email', href: '#' },
];
