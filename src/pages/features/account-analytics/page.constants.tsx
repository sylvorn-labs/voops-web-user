import {
  BankIcon,
  CreditCardIcon,
  Exchange01Icon,
  FileExportIcon,
  Invoice01Icon,
  Tag01Icon,
  TradeUpIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const accountAnalyticsConfig: FeaturePageConfig = {
  slug: 'account-analytics',
  badge: 'Multi-Account & Cash Flow',
  titleLead: 'Consolidate Every Bank, Wallet & Ledger in',
  titleAccent: 'One Single View',
  description:
    'Track operating checking accounts, credit lines, payment gateways, and petty cash drawers with live balance reconciliation and automated currency conversion.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: 'Real-Time',
      label: 'Balance Tracking',
      description: 'Instant recalculations on every recorded debit or credit.',
    },
    {
      value: 'Multi-Currency',
      label: 'FX Support',
      description:
        'Support for international currencies with exchange conversions.',
    },
    {
      value: 'Unlimited',
      label: 'Financial Accounts',
      description:
        'Add checking, savings, credit cards, Stripe, Wise, and cash.',
    },
    {
      value: '0% Drift',
      label: 'Reconciliation Precision',
      description: 'Double-entry consistency for airtight financial records.',
    },
  ],
  capabilitiesTitle: 'Total Visibility into Your Liquid Cash & Debt',
  capabilitiesDescription:
    'Stop logging into five different banking portals. Gain a centralized command center for all liquid capital, liabilities, and merchant payouts.',
  capabilities: [
    {
      title: 'Multi-Account Architecture',
      description:
        'Create and track operating checking accounts, payroll reserves, tax savings, corporate cards, and physical cash drawers.',
      icon: <HugeiconsIcon icon={Wallet02Icon} className="size-6" />,
      tag: 'Core Banking',
    },
    {
      title: 'Inter-Account Transfers',
      description:
        'Record frictionless fund transfers between your accounts with zero double-counting or ledger imbalance.',
      icon: <HugeiconsIcon icon={Exchange01Icon} className="size-6" />,
      tag: 'Double-Entry',
    },
    {
      title: 'Custom Account Types',
      description:
        'Categorize accounts as Bank, Credit Card, Merchant Settlement, Investment, or Cash Float to tailor your analytics.',
      icon: <HugeiconsIcon icon={BankIcon} className="size-6" />,
    },
    {
      title: 'Credit Card & Debt Tracking',
      description:
        'Monitor revolving credit utilization, statement cycles, and repayment schedules to avoid unexpected interest fees.',
      icon: <HugeiconsIcon icon={CreditCardIcon} className="size-6" />,
    },
    {
      title: 'Automated Cash Flow Insights',
      description:
        'Visual inflows vs. outflows curves forecasting runway and identifying sudden liquidity spikes or dips.',
      icon: <HugeiconsIcon icon={TradeUpIcon} className="size-6" />,
      tag: 'Intelligence',
    },
    {
      title: 'Audit Reconciliation & Exports',
      description:
        'Compare ledger balances with physical bank statements and export verified monthly reports for your tax filings.',
      icon: <HugeiconsIcon icon={FileExportIcon} className="size-6" />,
    },
  ],
  workflowTitle: 'How Multi-Account Tracking Operates',
  workflowDescription:
    'From setting initial balances to ongoing daily settlement reconciliation.',
  workflowSteps: [
    {
      step: '01',
      title: 'Set Up Your Financial Accounts',
      description:
        'Add each banking channel, merchant processor, and payment card with their starting balance and currency.',
      bulletPoints: [
        'Supports commercial banks, neobanks (Mercury, Wise, Revolut), and Stripe',
        'Define opening balances and custom account tags',
        'Set default payment accounts for quick expense logging',
      ],
      icon: <HugeiconsIcon icon={Wallet02Icon} className="size-6" />,
      previewCard: {
        badge: 'Liquidity Overview',
        title: 'Sylvorn Operating Holdings',
        subtitle: 'Total Liquid Balance: $148,920.00',
        metrics: [
          { label: 'Checking Accounts', value: '$92,400.00', tone: 'income' },
          { label: 'Credit Line Used', value: '$8,150.00', tone: 'expense' },
        ],
        items: [
          {
            title: 'Mercury Business Checking',
            detail: 'Primary Operating \u2022 USD',
            amount: '$74,250.00',
            tone: 'income',
          },
          {
            title: 'Wise Multi-Currency EUR',
            detail: 'European Payouts \u2022 EUR \u20ac16,500',
            amount: '$18,150.00',
            tone: 'income',
          },
          {
            title: 'Chase Ink Corporate Card',
            detail: 'Active Line \u2022 Limit: $25,000',
            amount: '-$8,150.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Log Income, Expenses & Internal Transfers',
      description:
        'Every time money moves, attribute the transaction directly to the designated source or destination account.',
      bulletPoints: [
        'Prevent unaccounted cash leaks across accounts',
        'Record credit card payoffs as simple inter-account transfers',
        'Track pending merchant payouts until cleared',
      ],
      icon: <HugeiconsIcon icon={Invoice01Icon} className="size-6" />,
      previewCard: {
        badge: 'Recent Account Activity',
        title: 'Account Ledger Log',
        subtitle: 'Filtered: Mercury Primary Checking',
        items: [
          {
            title: 'Stripe Merchant Payout #8492',
            detail: 'Direct Deposit \u2022 Category: Sales Revenue',
            amount: '+$6,400.00',
            tone: 'income',
          },
          {
            title: 'Transfer to Tax Reserve',
            detail: 'Internal Transfer \u2022 To: Vault Checking',
            amount: '-$1,500.00',
            tone: 'neutral',
          },
          {
            title: 'Google Cloud Platform',
            detail: 'Monthly Auto-Debit \u2022 Category: Infrastructure',
            amount: '-$340.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Analyze Runway & Cash Flow Trends',
      description:
        'Leverage real-time aggregated metrics to know your exact cash position, projected burn, and upcoming liabilities.',
      bulletPoints: [
        'Instant visibility into net liquid position',
        'One-click statement reconciliation against bank downloads',
        'CSV/Excel exports tailored for accountants',
      ],
      icon: <HugeiconsIcon icon={TradeUpIcon} className="size-6" />,
    },
  ],
  useCasesTitle: 'Who Relies on Account Analytics?',
  useCasesDescription:
    'From internet businesses with global payouts to brick-and-mortar storefronts.',
  useCases: [
    {
      target: 'E-commerce & SaaS',
      title: 'Multi-Gateway & Merchant Payouts',
      description:
        'Track funds flowing between Stripe, PayPal, Wise, and bank settlement accounts without losing track of processor fees.',
      highlights: [
        'Clean gross revenue vs. net deposit tracking',
        'Foreign exchange conversion monitoring',
        'Clear merchant reserve tracking',
      ],
      icon: <HugeiconsIcon icon={Wallet02Icon} className="size-5" />,
    },
    {
      target: 'Agencies & Service Firms',
      title: 'Client Retainer & Tax Reserves',
      description:
        'Keep client prepayments and quarterly tax withholding safely separated in dedicated reserve sub-accounts.',
      highlights: [
        'Avoid accidentally spending tax money',
        'Track retainer burn per client project',
        'Accurate real-time operating liquidity',
      ],
      icon: <HugeiconsIcon icon={Tag01Icon} className="size-5" />,
    },
    {
      target: 'Retail & Local Businesses',
      title: 'Cash Drawers & POS Reconciliation',
      description:
        'Manage cash floats, register drops, and physical cash deposits alongside modern credit card point-of-sale settlements.',
      highlights: [
        'Petty cash drawer balancing',
        'End-of-day register drop logging',
        'Shrinkage and discrepancy detection',
      ],
      icon: <HugeiconsIcon icon={BankIcon} className="size-5" />,
    },
  ],
  faqsTitle: 'Account Analytics FAQs',
  faqsDescription:
    'Answers to common questions regarding account types, currencies, and transfers.',
  faqs: [
    {
      question: 'Can I add both traditional bank accounts and digital wallets?',
      answer:
        'Yes. You can create accounts for standard commercial banks, credit cards, digital wallets like Wise or PayPal, merchant processors like Stripe, and physical cash drawers.',
    },
    {
      question: 'How do inter-account transfers work?',
      answer:
        'Voops lets you record an internal transfer between any two accounts in the same business workspace with a single entry. This moves the balance seamlessly without double-counting income or expenses.',
    },
    {
      question: 'Can I track negative balances on credit cards?',
      answer:
        'Yes. Credit card accounts accurately track running balances as liabilities, clearly displaying available credit and total amount due.',
    },
    {
      question: 'Is bank reconciliation supported?',
      answer:
        'Yes. You can verify your Voops ledger balance against your monthly bank statements to ensure zero discrepancies and audit-ready records.',
    },
  ],
};
