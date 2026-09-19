import {
  Building03Icon,
  HierarchyIcon,
  LockPasswordIcon,
  RefreshIcon,
  SecurityCheckIcon,
  Shield02Icon,
  ShoppingBag01Icon,
  Store01Icon,
  WorkflowSquare01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const multiBusinessConfig: FeaturePageConfig = {
  slug: 'multi-business',
  badge: 'Multi-Tenant Architecture',
  titleLead: 'Manage Multiple Companies with',
  titleAccent: 'Zero Context Switching',
  description:
    'Separate your holding company, side ventures, e-commerce stores, and consultancy books with strict database-level isolation under a single secure login.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: '1-Click',
      label: 'Tenant Switching',
      description: 'Instant workspace switching with zero reload lag.',
    },
    {
      value: '100%',
      label: 'Data Isolation',
      description: 'Strict PostgreSQL RLS preventing cross-business leaks.',
    },
    {
      value: 'Unlimited',
      label: 'Business Entities',
      description: 'Host as many companies, branches, or side gigs as you run.',
    },
    {
      value: '0 min',
      label: 'Separate Logins',
      description: 'One master account to control every separate ledger.',
    },
  ],
  capabilitiesTitle: 'Enterprise-Grade Multi-Tenant Isolation',
  capabilitiesDescription:
    'Built from the database layer up to ensure your independent businesses remain completely distinct while giving you high-level visibility.',
  capabilities: [
    {
      title: 'Isolated Ledgers & Accounts',
      description:
        'Each business gets its own independent set of bank accounts, categories, projects, members, and transaction histories.',
      icon: <HugeiconsIcon icon={Building03Icon} className="size-6" />,
      tag: 'Core Tenet',
    },
    {
      title: 'Instant Workspace Switching',
      description:
        'Switch between client holding entities, LLCs, and freelance gigs with a single keystroke or dropdown selection without logging out.',
      icon: <HugeiconsIcon icon={RefreshIcon} className="size-6" />,
      tag: 'High Velocity',
    },
    {
      title: 'PostgreSQL Row-Level Security',
      description:
        'Guaranteed zero cross-tenant contamination. Every query is scoped to the authenticated workspace ID at the database tier.',
      icon: <HugeiconsIcon icon={Shield02Icon} className="size-6" />,
      tag: 'Zero-Trust',
    },
    {
      title: 'Per-Business Currency & Settings',
      description:
        'Configure distinct base currencies, tax rates, financial year ends, and accounting formats for each registered entity.',
      icon: <HugeiconsIcon icon={HierarchyIcon} className="size-6" />,
    },
    {
      title: 'Independent Member Permissions',
      description:
        'An employee can be an Admin in your retail business but have zero visibility or access into your software startup.',
      icon: <HugeiconsIcon icon={LockPasswordIcon} className="size-6" />,
    },
    {
      title: 'Consolidated Auditing & Exports',
      description:
        'Generate discrete P&L and cash flow reports per business, or download separate tax packs for your respective accountants.',
      icon: <HugeiconsIcon icon={SecurityCheckIcon} className="size-6" />,
    },
  ],
  workflowTitle: 'How Multi-Business Works in Voops',
  workflowDescription:
    'Create, organize, and administer all your ventures with zero friction.',
  workflowSteps: [
    {
      step: '01',
      title: 'Register Your Business Workspaces',
      description:
        'Create dedicated workspaces for each LLC, holding company, agency, or side project in seconds.',
      bulletPoints: [
        'Set company name, default currency (USD, EUR, GBP, INR, etc.)',
        'Assign custom color coding and business tags',
        'Auto-generate standard chart of accounts',
      ],
      icon: <HugeiconsIcon icon={Building03Icon} className="size-6" />,
      previewCard: {
        badge: 'Workspace Switcher',
        title: 'Sylvorn Labs Inc.',
        subtitle: 'Holding Corporation \u2022 Base: USD',
        metrics: [
          { label: 'Active Workspaces', value: '4 Entities', tone: 'neutral' },
          { label: 'Monthly Inflow', value: '$42,850.00', tone: 'income' },
        ],
        items: [
          {
            title: 'Apex E-commerce LLC',
            detail: 'Retail & Inventory',
            amount: 'Active',
            tone: 'income',
          },
          {
            title: 'SaaS Studio Ltd',
            detail: 'Software Operations',
            amount: 'Active',
            tone: 'info',
          },
          {
            title: 'Freelance Design Co',
            detail: 'Consultancy',
            amount: 'Active',
            tone: 'neutral',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Configure Distinct Accounts & Categories',
      description:
        'Set up bank accounts, payment gateways, and operational expense structures unique to each business model.',
      bulletPoints: [
        'Prevent mixing business and personal expenses',
        'Map Stripe, Wise, and local bank accounts directly',
        'Set custom category trees tailored to each industry',
      ],
      icon: <HugeiconsIcon icon={WorkflowSquare01Icon} className="size-6" />,
      previewCard: {
        badge: 'Isolated Books',
        title: 'Apex E-commerce Accounts',
        subtitle: '3 Active Payment Channels',
        items: [
          {
            title: 'Silicon Valley Bank (Operating)',
            detail: 'Primary Checking',
            amount: '$24,500.00',
            tone: 'neutral',
          },
          {
            title: 'Stripe Payouts Balance',
            detail: 'Incoming Merchant Settlement',
            amount: '$12,890.00',
            tone: 'income',
          },
          {
            title: 'Logistics Float & Petty Cash',
            detail: 'Warehouse Ops',
            amount: '$1,400.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Switch in Real Time with Full Privacy',
      description:
        'Seamlessly toggle between workspaces with complete assurance that team access and reports stay completely isolated.',
      bulletPoints: [
        'Zero chance of sending reports to the wrong company stakeholder',
        'Audit-ready record keeping per legal entity',
        'Instant mobile and web synchronized data',
      ],
      icon: <HugeiconsIcon icon={RefreshIcon} className="size-6" />,
    },
  ],
  useCasesTitle: 'Who Relies on Multi-Business Workspaces?',
  useCasesDescription:
    'Tailored for modern operators managing multiple revenue streams.',
  useCases: [
    {
      target: 'Serial Founders',
      title: 'Multiple Startups & HoldCos',
      description:
        'Oversee multiple early-stage startups or side ventures without creating separate email accounts or subscription bills.',
      highlights: [
        'Single unified billing & account access',
        'Separate team members per startup',
        'Instant portfolio burn-rate monitoring',
      ],
      icon: <HugeiconsIcon icon={Building03Icon} className="size-5" />,
    },
    {
      target: 'Agencies & Studios',
      title: 'Separate In-House & Client Entities',
      description:
        'Keep internal agency operational costs strictly separated from spin-off ventures and sister studios.',
      highlights: [
        'Zero risk of data leakage',
        'Custom base currencies per entity',
        'Independent invoice & receipt repositories',
      ],
      icon: <HugeiconsIcon icon={Store01Icon} className="size-5" />,
    },
    {
      target: 'Freelancers & Contractors',
      title: 'Business vs. Sole Proprietorship',
      description:
        'Keep your primary consultancy and secondary personal investments cleanly divided for painless tax prep.',
      highlights: [
        'Clean Schedule C / tax preparation',
        'Separate bank account associations',
        'Zero manual Excel spreadsheet juggling',
      ],
      icon: <HugeiconsIcon icon={ShoppingBag01Icon} className="size-5" />,
    },
  ],
  faqsTitle: 'Multi-Business FAQs',
  faqsDescription:
    'Frequently asked questions about workspace isolation and multi-company setup.',
  faqs: [
    {
      question: 'Is there any limit to the number of businesses I can create?',
      answer:
        'No, Voops allows you to create and manage multiple businesses under one account. Whether you manage 2 companies or 20, they remain neatly separated in your workspace dropdown.',
    },
    {
      question: 'Can team members in one business see my other businesses?',
      answer:
        'No. Team members are invited on a per-business basis. Unless you explicitly invite a team member to your other business workspaces, they will not even know your other entities exist.',
    },
    {
      question: 'Can each business have its own base currency?',
      answer:
        'Yes. You can configure USD for your US Delaware entity, EUR for your European branch, and GBP for your UK business with accurate local currency formatting.',
    },
    {
      question: 'Can I export reports for each business separately?',
      answer:
        'Yes. You can generate discrete CSV, Excel, and PDF P&L statements, balance sheets, and transaction ledgers tailored for the specific business entity.',
    },
  ],
};
