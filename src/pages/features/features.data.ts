import {
  Building03Icon,
  Folder02Icon,
  Tag01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';

export interface CoreFeatureMeta {
  slug: string;
  title: string;
  shortDescription: string;
  badge: string;
  url: string;
  icon: typeof Building03Icon;
}

export const coreFeatures: CoreFeatureMeta[] = [
  {
    slug: 'multi-business',
    title: 'Multi-Business Management',
    shortDescription:
      'Manage multiple independent companies and business entities from a single unified login.',
    badge: 'Multi-Tenant Architecture',
    url: '/features/multi-business',
    icon: Building03Icon,
  },
  {
    slug: 'team-collaboration',
    title: 'Team Collaboration & RBAC',
    shortDescription:
      'Granular roles, transaction approval flows, and secure member-level access control.',
    badge: 'Role-Based Access',
    url: '/features/team-collaboration',
    icon: UserGroupIcon,
  },
  {
    slug: 'account-analytics',
    title: 'Multi-Account & Cash Flow',
    shortDescription:
      'Connect multiple bank accounts, cash registers, and wallets with automated ledger sync.',
    badge: 'Real-Time Balances',
    url: '/features/account-analytics',
    icon: Wallet02Icon,
  },
  {
    slug: 'category-organization',
    title: 'Category Organization',
    shortDescription:
      'Hierarchical category breakdowns, spending velocity metrics, and custom budget limits.',
    badge: 'Expense Intelligence',
    url: '/features/category-organization',
    icon: Tag01Icon,
  },
  {
    slug: 'project-analytics',
    title: 'Project Budgeting & P&L',
    shortDescription:
      'Track client milestones, project timelines, and real-time Profit & Loss per initiative.',
    badge: 'Project Profitability',
    url: '/features/project-analytics',
    icon: Folder02Icon,
  },
  {
    slug: 'people-analytics',
    title: 'People & Contractor Analytics',
    shortDescription:
      'Track contractor payouts, team member reimbursements, and individual spending footprints.',
    badge: 'Member Attribution',
    url: '/features/people-analytics',
    icon: UserIcon,
  },
];
