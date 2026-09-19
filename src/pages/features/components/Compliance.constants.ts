import { Github, Postgresql, Supabase } from '@thesvg/react';

import type { ComplianceBadge, ComplianceFeature } from './Compliance.d';

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
    title: 'Open Source GitHub',
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
    title: 'Open-Source & Permissive License',
    description:
      '100% open source under a permissive license. No proprietary black boxes or vendor lock-in — inspect and audit every line of code.',
    icon: Github,
    badgeAlt: 'Open Source',
  },
  {
    title: 'Self-Hostable & Full Data Sovereignty',
    description:
      'Retain complete ownership of your business financials. Self-host on your own infrastructure or run on your own Supabase instance.',
    icon: Supabase,
    badgeAlt: 'Self Hostable',
  },
];
