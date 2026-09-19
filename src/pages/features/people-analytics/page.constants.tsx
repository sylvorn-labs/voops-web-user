import {
  FileValidationIcon,
  Invoice01Icon,
  Shield02Icon,
  Tag01Icon,
  UserCheck01Icon,
  UserGroupIcon,
  UserIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const peopleAnalyticsConfig: FeaturePageConfig = {
  slug: 'people-analytics',
  badge: 'Member & Contractor Intelligence',
  titleLead: 'Track Contractor Payouts & Team Spend with',
  titleAccent: 'Person-Level Attribution',
  description:
    'Monitor disbursements to vendors, freelancers, and employees. Keep individual reimbursements, 1099 contractor totals, and department spend completely transparent.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: '100%',
      label: 'Person Attribution',
      description:
        'Attribute expenses and payouts directly to specific individuals.',
    },
    {
      value: '1-Click',
      label: '1099 & Tax Summaries',
      description: 'Instantly summarize yearly contractor compensation totals.',
    },
    {
      value: 'Zero Friction',
      label: 'Reimbursement Audits',
      description: 'Track submitted vs. settled employee expense claims.',
    },
    {
      value: 'Unlimited',
      label: 'Contractors & Contacts',
      description: 'Maintain detailed payout histories for your full network.',
    },
  ],
  capabilitiesTitle: 'Total Visibility into Individual Spending Footprints',
  capabilitiesDescription:
    'Gain complete oversight of vendor disbursements, freelancer retainer histories, and team member expense claims without complicated spreadsheet formulas.',
  capabilities: [
    {
      title: 'Person-Level Ledger History',
      description:
        'Access a dedicated ledger for every team member, contractor, or vendor showing every transaction attributed to their name.',
      icon: <HugeiconsIcon icon={UserIcon} className="size-6" />,
      tag: 'Individual Books',
    },
    {
      title: 'Contractor & 1099 Tracking',
      description:
        'Keep rolling cumulative records of all freelancer disbursements throughout the financial year for seamless 1099-NEC tax reporting.',
      icon: <HugeiconsIcon icon={FileValidationIcon} className="size-6" />,
      tag: 'Tax Compliance',
    },
    {
      title: 'Employee Expense Reimbursements',
      description:
        'Track employee out-of-pocket expenses from submission through approval and bank reimbursement settlement.',
      icon: <HugeiconsIcon icon={Wallet02Icon} className="size-6" />,
      tag: 'Reimbursements',
    },
    {
      title: 'Multi-Project Person Allocation',
      description:
        'See how a contractor’s billable hours and invoices are distributed across multiple client projects and business entities.',
      icon: <HugeiconsIcon icon={Tag01Icon} className="size-6" />,
    },
    {
      title: 'Contact Profile & Payment Notes',
      description:
        'Store payment preferences (ACH, Wire, Wise, Crypto, PayPal) and tax ID notes directly inside each person profile.',
      icon: <HugeiconsIcon icon={UserCheck01Icon} className="size-6" />,
    },
    {
      title: 'Secure Privacy Controls',
      description:
        'Ensure contractor rate information and personal reimbursement logs are only accessible to authorized Owners and Admins.',
      icon: <HugeiconsIcon icon={Shield02Icon} className="size-6" />,
    },
  ],
  workflowTitle: 'How People Analytics Operates',
  workflowDescription:
    'From adding a new freelancer to closing year-end compensation reviews.',
  workflowSteps: [
    {
      step: '01',
      title: 'Add Team Members, Contractors & Vendors',
      description:
        'Create profiles for anyone who incurs expenses or receives compensation from your business workspace.',
      bulletPoints: [
        'Tag contacts as Employee, Subcontractor, Agency, or Vendor',
        'Assign payment default terms and tax ID classifications',
        'Link to existing user accounts or keep as external payee profiles',
      ],
      icon: <HugeiconsIcon icon={UserGroupIcon} className="size-6" />,
      previewCard: {
        badge: 'Payee Directory',
        title: 'Sylvorn Contractor Roster',
        subtitle: '8 Active Payees \u2022 YTD Payouts: $68,400.00',
        items: [
          {
            title: 'Marcus Vance (Senior Frontend Contractor)',
            detail: 'YTD Paid: $24,500.00 \u2022 Rate: $85/hr',
            amount: 'Active',
            tone: 'income',
          },
          {
            title: 'Chloe Bennett (Copywriter)',
            detail: 'YTD Paid: $8,200.00 \u2022 Retainer',
            amount: 'Active',
            tone: 'neutral',
          },
          {
            title: 'Summit Cloud Solutions (DevOps Vendor)',
            detail: 'YTD Paid: $18,900.00 \u2022 Monthly SLA',
            amount: 'Active',
            tone: 'info',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Attribute Invoices, Payouts & Reimbursements',
      description:
        'Tag transactions with the associated person name whenever payroll runs or reimbursement requests are settled.',
      bulletPoints: [
        'Instantly calculate cumulative payouts per individual',
        'Attach contractor invoices and payment confirmation receipts',
        'Cross-reference against project deliverable milestones',
      ],
      icon: <HugeiconsIcon icon={Invoice01Icon} className="size-6" />,
      previewCard: {
        badge: 'Individual Payout History',
        title: 'Marcus Vance \u2022 Ledger',
        subtitle: 'Total Attributed: $24,500.00 (6 Invoices)',
        items: [
          {
            title: 'Invoice #MV-2026-08 (Sprint 14)',
            detail: 'Project: Mobile Redesign \u2022 Paid via Wise',
            amount: '$4,250.00',
            tone: 'expense',
          },
          {
            title: 'Travel Reimbursement (Design Sprint)',
            detail: 'Flight & Hotel Receipts Attached',
            amount: '$680.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Generate Year-End Contractor Packs',
      description:
        'Export full-year summaries per contractor in one click, ready for your CPA or payroll provider to file 1099-NEC forms.',
      bulletPoints: [
        'Zero manual math when preparing annual 1099 filings',
        'Export verified PDF payee payment statements',
        'Maintain historical records for tax compliance audits',
      ],
      icon: <HugeiconsIcon icon={FileValidationIcon} className="size-6" />,
    },
  ],
  useCasesTitle: 'Who Relies on People Analytics?',
  useCasesDescription:
    'Ideal for organizations working with distributed talent and flexible teams.',
  useCases: [
    {
      target: 'Agencies with Freelancers',
      title: 'Contractor Margin & Milestone Auditing',
      description:
        'Keep precise records of what each freelancer billed across different client projects to evaluate contractor efficiency and margins.',
      highlights: [
        'Contractor rate transparency',
        'Milestone payout scheduling',
        'Instant contractor statement generation',
      ],
      icon: <HugeiconsIcon icon={UserGroupIcon} className="size-5" />,
    },
    {
      target: 'Remote Startups',
      title: 'Global Team Reimbursements',
      description:
        'Provide remote workers with a clear history of submitted and reimbursed expenses for home office gear, coworking, and travel.',
      highlights: [
        'Fast reimbursement reconciliation',
        'Receipt audit compliance',
        'Elimination of reimbursement disputes',
      ],
      icon: <HugeiconsIcon icon={Wallet02Icon} className="size-5" />,
    },
    {
      target: 'Small Business Owners',
      title: '1099 Contractor Compliance',
      description:
        'Never scramble in January to figure out which vendors and freelancers crossed the $600 reporting threshold.',
      highlights: [
        'Automated 1099 threshold tracking',
        'Instant year-end compensation summary',
        'Accountant-ready data exports',
      ],
      icon: <HugeiconsIcon icon={FileValidationIcon} className="size-5" />,
    },
  ],
  faqsTitle: 'People Analytics FAQs',
  faqsDescription:
    'Frequently asked questions regarding person attribution, reimbursements, and contractor reports.',
  faqs: [
    {
      question: 'Can I track people who do not have a Voops account login?',
      answer:
        'Yes. You can create external payee profiles for freelancers, contractors, and vendors to attribute expenses and payouts without needing to invite them into your workspace.',
    },
    {
      question: 'How does Voops assist with 1099 contractor reporting?',
      answer:
        'Voops automatically tracks cumulative annual disbursements per contractor. At year end, you can export a report listing all payees who exceeded reporting thresholds with total compensation.',
    },
    {
      question: 'Can I track out-of-pocket employee expense reimbursements?',
      answer:
        'Yes. Team members can submit expense claims with receipts attached, and managers can mark them as reimbursed once payment is executed from the company bank account.',
    },
    {
      question: 'Can team members see what other contractors are paid?',
      answer:
        'No. Rate information and payee totals are restricted to workspace Owners and Admins to ensure compensation confidentiality.',
    },
  ],
};
