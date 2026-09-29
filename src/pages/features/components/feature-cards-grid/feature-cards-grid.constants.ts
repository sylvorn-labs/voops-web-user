import type { FeatureCardListItem } from './feature-cards-grid.d';

export const defaultFeatures: FeatureCardListItem[] = [
  {
    title: 'Real-Time Reactive Cloud Sync',
    description:
      'Instant bidirectional data synchronization between Flutter mobile clients and React web dashboard powered by Supabase.',
    image: {
      src: '/images/illustrations/cloud_sync.svg',
      alt: 'Real-Time Cloud Sync',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Multi-Currency & Custom Accounts',
    description:
      'Manage multiple bank accounts, cash drawers, and custom balance accounts with automated currency conversions.',
    image: {
      src: '/images/illustrations/wallet.svg',
      alt: 'Multi-Currency & Custom Accounts',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Granular Role-Based Access Control',
    description:
      'Protect sensitive business finances by assigning granular viewing, editing, and approval permissions to team members.',
    image: {
      src: '/images/illustrations/fingerprint.svg',
      alt: 'Granular Role-Based Access Control',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
  {
    title: 'Automated Financial Reports & Exports',
    description:
      'Generate audit-ready CSV, Excel, and PDF reports for tax filings, stakeholder presentations, and accountant handoffs.',
    image: {
      src: '/images/illustrations/spreadsheets.svg',
      alt: 'Automated Financial Reports & Exports',
    },
    href: 'https://github.com/sylvorn-labs/voops-web-user',
  },
];
