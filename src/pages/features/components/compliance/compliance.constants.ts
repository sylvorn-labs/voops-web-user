import { Github, Postgresql, Supabase } from '@thesvg/react';

import type { ComplianceBadge, ComplianceFeature } from './compliance.d';

export const defaultBadges: ComplianceBadge[] = [
  {
    title: 'PostgreSQL RLS',
    icon: Postgresql,
  },
  {
    title: 'Supabase Security',
    icon: Supabase,
  },
  {
    title: 'Public Beta Codebase',
    icon: Github,
  },
];

export const defaultFeatures: ComplianceFeature[] = [
  {
    title: 'Row-Level Security (RLS) Isolation',
    description:
      'Database-level tenant isolation powered by Supabase PostgreSQL RLS guarantees zero cross-organization data leakage.',
    icon: Postgresql,
    badgeAlt: 'PostgreSQL RLS',
  },
  {
    title: 'Limited-Time Open Source (Beta)',
    description:
      'Inspect and audit the codebase during our public beta release on GitHub. Full architectural transparency with zero hidden black boxes.',
    icon: Github,
    badgeAlt: 'Limited-Time Open Source',
  },
  {
    title: 'Data Sovereignty & Portability',
    description:
      'Retain complete ownership of your business financials with unencumbered rights to export your entire ledger data anytime.',
    icon: Supabase,
    badgeAlt: 'Data Sovereignty',
  },
];
