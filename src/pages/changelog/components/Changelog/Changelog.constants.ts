import type { ChangelogEntry } from './Changelog.d';

export const defaultEntries: ChangelogEntry[] = [
  {
    version: 'Web Dev',
    date: '13 September 2026',
    title: 'Kick Started Web Application Development',
    description:
      'Commenced official React web application development with full Supabase integration, OAuth authentication, and multi-business workspace management.',
    items: [
      'Engineered React web frontend using modern web standards',
      'Integrated Supabase PostgreSQL database and real-time synchronization',
      'Implemented Row-Level Security (RLS) and authentication flows',
      'Built multi-business and multi-store money management interfaces',
    ],
    button: {
      url: 'https://github.com/Sylvorn-Labs/voops-web-user',
      text: 'View Web Repository',
    },
  },
  {
    version: 'Rebrand',
    date: '10 September 2026',
    title: 'Rebranded to Voops',
    description:
      'Transitioned from the initial working name "Expense Tracker" to our official brand "Voops" — inspired by our own problem statement: "Oops! There goes the money."',
    items: [
      'Formulated brand identity and tagline: "Oops! There goes the money."',
      'Unified design system and visual theme guidelines',
      'Established open-source product strategy under Sylvorn Labs',
    ],
  },
  {
    version: 'Mobile Dev',
    date: '31 August 2026',
    title: 'Kick Started Mobile Application Development',
    description:
      'Collaborated with Jaydeep Gohil to kick off cross-platform mobile application development using Flutter for iOS and Android.',
    items: [
      'Setup Flutter cross-platform architecture for iOS and Android',
      'Connected Supabase real-time client with local caching',
      'Designed frictionless daily transaction and receipt capture flows',
    ],
    button: {
      url: 'https://github.com/sylvorn-labs/voops-mobile-user',
      text: 'View Flutter Mobile Repo',
    },
  },
  {
    version: 'Planning',
    date: '26 - 30 August 2026',
    title: 'Planning & Architecture Brainstorming',
    description:
      'Brainstormed daily routines to eliminate friction and addressed core questions around timelines, maintenance, scale, and economics.',
    items: [
      'Selected Supabase for SQL Postgres, tried & tested OAuth, and RLS security',
      'Configured S3-compatible Object Storage for bills and invoices',
      'Designed schemas for multiple money stores (cash, wallets, bank accounts)',
      'Defined project P&L and multi-person transaction architectures',
    ],
  },
  {
    version: 'Conception',
    date: '20 - 25 August 2026',
    title: 'Idea Conception by Parth Kachhela',
    description:
      'Identified the critical need for a dedicated expense tracker after evaluating existing apps (including Khata book via AI search) that failed to match multi-business requirements.',
    items: [
      'Identified pain points in tracking multi-project incomes and expenses',
      'Addressed lack of clarity during client and outsourcing meetings',
      'Committed to building a lightweight, internal-first, open-source platform',
    ],
  },
];
