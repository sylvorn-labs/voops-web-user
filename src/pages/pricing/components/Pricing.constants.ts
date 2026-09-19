import type { PricingPlan } from './Pricing.d';

export const defaultPlan: PricingPlan = {
  name: 'Free Beta Access',
  description:
    'All features are completely free during our active development & beta testing period.',
  price: '0',
  period: '/free during beta',
  buttonText: 'Start Free Beta Access',
  buttonUrl: '/register',
};

export const defaultFeatureGroups: string[][] = [
  [
    'Unlimited businesses & company ledgers',
    'Multiple money stores (cash, wallets, bank accounts)',
    'Sub-second Supabase cloud sync',
  ],
  [
    'Multi-member team collaboration & roles',
    'Granular permissions & protected balances',
    'Project budgets, milestones & P&L analytics',
  ],
  [
    'Category & people-level analytics',
    'Audit-ready CSV, Excel & PDF exports',
    'Cross-platform Web (React) & Mobile (Flutter)',
  ],
];
