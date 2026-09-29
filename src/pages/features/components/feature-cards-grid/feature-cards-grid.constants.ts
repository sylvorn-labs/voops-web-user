import type { FeatureCardListItem } from './feature-cards-grid.d';

export const defaultFeatures: FeatureCardListItem[] = [
  {
    title: 'Real-Time Reactive Cloud Sync',
    description:
      'Instant bidirectional data synchronization between Flutter mobile clients and React web dashboard powered by Supabase.',
    image: {
      src: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Real-Time Cloud Sync',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Multi-Currency & Custom Accounts',
    description:
      'Manage multiple bank accounts, cash drawers, and custom balance accounts with automated currency conversions.',
    image: {
      src: 'https://images.unsplash.com/photo-1703355685738-23256fc1d9ca?auto=format&fit=crop&w=1200&q=80',
      alt: 'Multi-Currency & Custom Accounts',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Granular Role-Based Access Control',
    description:
      'Protect sensitive business finances by assigning granular viewing, editing, and approval permissions to team members.',
    image: {
      src: 'https://images.unsplash.com/photo-1585079374502-415f8516dcc3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Granular Role-Based Access Control',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Automated Financial Reports & Exports',
    description:
      'Generate audit-ready CSV, Excel, and PDF reports for tax filings, stakeholder presentations, and accountant handoffs.',
    image: {
      src: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?auto=format&fit=crop&w=1200&q=80',
      alt: 'Automated Financial Reports & Exports',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
];
