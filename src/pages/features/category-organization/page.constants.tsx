import {
  FilterHorizontalIcon,
  Folder02Icon,
  HierarchyIcon,
  Layers01Icon,
  PieChart01Icon,
  Tag01Icon,
  Target01Icon,
  WorkflowSquare01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const categoryOrganizationConfig: FeaturePageConfig = {
  slug: 'category-organization',
  badge: 'Expense Intelligence',
  titleLead: 'Structure Your Spending with',
  titleAccent: 'Intelligent Categorization',
  description:
    'Organize operating expenses, recurring software subscriptions, payroll, and COGS with custom category hierarchies and real-time budget thresholds.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: '100%',
      label: 'Customizable Categories',
      description: 'Create unlimited parent and subcategory combinations.',
    },
    {
      value: 'Real-Time',
      label: 'Budget Overrun Alerts',
      description: 'Track category spending velocity against monthly targets.',
    },
    {
      value: 'Instant',
      label: 'Tax Pack Readiness',
      description: 'Group expenses by tax-deductible categories.',
    },
    {
      value: 'Visual',
      label: 'Spending Breakdowns',
      description: 'Pie and bar analytics revealing your largest cost centers.',
    },
  ],
  capabilitiesTitle: 'Granular Categorization for Total Cost Clarity',
  capabilitiesDescription:
    'Gain immediate visual clarity on where every dollar goes. Detect cost creep, eliminate redundant subscriptions, and streamline tax classifications.',
  capabilities: [
    {
      title: 'Custom Category Trees',
      description:
        'Create categories tailored to your unique business model, from Cloud Hosting to Inventory Logistics and Legal Retainers.',
      icon: <HugeiconsIcon icon={Tag01Icon} className="size-6" />,
      tag: 'Flexible Hierarchy',
    },
    {
      title: 'Visual Spending Analytics',
      description:
        'Interactive charts revealing month-over-month category trends, percentage of total burn, and high-velocity spikes.',
      icon: <HugeiconsIcon icon={PieChart01Icon} className="size-6" />,
      tag: 'Visual Intelligence',
    },
    {
      title: 'Budget Caps & Thresholds',
      description:
        'Set target monthly spending caps on volatile categories like Advertising or Travel and get alerted before you exceed limits.',
      icon: <HugeiconsIcon icon={Target01Icon} className="size-6" />,
    },
    {
      title: 'Income vs Expense Grouping',
      description:
        'Cleanly segment incoming revenue streams (SaaS subscriptions, consulting, product sales) from operating outflows.',
      icon: <HugeiconsIcon icon={Layers01Icon} className="size-6" />,
    },
    {
      title: 'Multi-Criteria Filtering',
      description:
        'Filter transaction ledgers by category combined with date ranges, specific projects, accounts, or team members.',
      icon: <HugeiconsIcon icon={FilterHorizontalIcon} className="size-6" />,
    },
    {
      title: 'Tax Schedule Alignment',
      description:
        'Tag categories with tax deductible flags to auto-generate IRS/HMRC-friendly Schedule C category summaries at year end.',
      icon: <HugeiconsIcon icon={HierarchyIcon} className="size-6" />,
      tag: 'Tax Prep',
    },
  ],
  workflowTitle: 'How Category Organization Operates',
  workflowDescription:
    'Set up categories once, tag transactions effortlessly, and unlock actionable financial insights.',
  workflowSteps: [
    {
      step: '01',
      title: 'Define Your Chart of Categories',
      description:
        'Create categories and sub-categories with custom icon associations and color tags that reflect your business operations.',
      bulletPoints: [
        'Pre-loaded standard templates (SaaS, Agency, Retail, Freelancer)',
        'Create custom categories with custom icons and color schemes',
        'Assign monthly budget targets per category',
      ],
      icon: <HugeiconsIcon icon={Folder02Icon} className="size-6" />,
      previewCard: {
        badge: 'Category Breakdown',
        title: 'Monthly Spend by Category',
        subtitle: 'Current Month: $18,450.00 Total Outflow',
        items: [
          {
            title: 'Cloud Infrastructure & Servers',
            detail: 'AWS, Vercel, Supabase \u2022 42% of tech spend',
            amount: '$4,280.00',
            tone: 'expense',
          },
          {
            title: 'Contractor & Freelancer Fees',
            detail: 'UI/UX Design, Content Writing',
            amount: '$7,800.00',
            tone: 'expense',
          },
          {
            title: 'SaaS Software & Tooling',
            detail: 'GitHub, Linear, Slack, Figma',
            amount: '$1,350.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Tag Line Items at Point of Entry',
      description:
        'Categorize expenses in one tap when snapping receipts on mobile or entering transactions in the web dashboard.',
      bulletPoints: [
        'Quick category selector with smart recent suggestions',
        'Split single transactions across multiple categories',
        'Attach receipts, notes, and invoice IDs',
      ],
      icon: <HugeiconsIcon icon={WorkflowSquare01Icon} className="size-6" />,
      previewCard: {
        badge: 'Transaction Tagger',
        title: 'Figma Annual Organization Plan',
        subtitle: 'Auto-attributed Category: SaaS Tooling',
        items: [
          {
            title: 'Category: Software & SaaS',
            detail: 'Subcategory: Design Tooling',
            amount: '$540.00',
            tone: 'neutral',
          },
          {
            title: 'Budget Impact',
            detail: 'SaaS Budget: $1,500.00 (36% used)',
            amount: 'On Track',
            tone: 'income',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Identify Cost Optimization Opportunities',
      description:
        'Review visual distribution graphs to spot recurring cost creep, negotiate vendor rates, and eliminate duplicate tools.',
      bulletPoints: [
        'Monthly category comparison charts',
        'Instant identification of top 5 spending drivers',
        'One-click category exports for stakeholder reporting',
      ],
      icon: <HugeiconsIcon icon={PieChart01Icon} className="size-6" />,
    },
  ],
  useCasesTitle: 'Who Relies on Category Intelligence?',
  useCasesDescription:
    'From lean startups optimizing runway to agencies managing complex project pass-throughs.',
  useCases: [
    {
      target: 'Bootstrapped Founders',
      title: 'SaaS & Overhead Optimization',
      description:
        'Uncover forgotten tool subscriptions, monitor hosting expenses as traffic scales, and extend company runway.',
      highlights: [
        'Eliminate unused software seats',
        'Compare vendor price spikes',
        'Protect monthly burn margins',
      ],
      icon: <HugeiconsIcon icon={PieChart01Icon} className="size-5" />,
    },
    {
      target: 'Agencies & Studios',
      title: 'Client Rebillable vs. Operational Overhead',
      description:
        'Separate general agency operational expenses from direct project expenses rebillable to clients.',
      highlights: [
        'Pass-through cost clarity',
        'Accurate margin calculations',
        'Clean client invoice attachments',
      ],
      icon: <HugeiconsIcon icon={Layers01Icon} className="size-5" />,
    },
    {
      target: 'Content Creators & Freelancers',
      title: 'Tax Write-Off Categorization',
      description:
        'Keep hardware purchases, home office utilities, and travel expenses properly organized for end-of-year tax deductions.',
      highlights: [
        'Zero lost receipt write-offs',
        'Pre-categorized Schedule C fields',
        'Export ready for tax filing software',
      ],
      icon: <HugeiconsIcon icon={Tag01Icon} className="size-5" />,
    },
  ],
  faqsTitle: 'Category Organization FAQs',
  faqsDescription:
    'Frequently asked questions regarding category hierarchies, budgets, and reporting.',
  faqs: [
    {
      question: 'Can I create custom categories or am I locked into presets?',
      answer:
        'You have full control to create, rename, and reorganize custom categories and subcategories anytime. Voops also provides sensible starter presets for tech startups, agencies, and freelancers.',
    },
    {
      question: 'Can a single transaction be split across multiple categories?',
      answer:
        'Yes. You can split an invoice or purchase (such as an office supply order containing both equipment and software) into multiple discrete category line items.',
    },
    {
      question: 'Can I set monthly budgets for individual categories?',
      answer:
        'Yes. You can assign spending thresholds per category and visually monitor progress bars to ensure you never exceed your planned budget.',
    },
    {
      question: 'Can I filter transaction exports by category?',
      answer:
        'Yes. You can filter by any single category or category group and export clean CSV, Excel, or PDF reports for internal analysis or accountant reviews.',
    },
  ],
};
