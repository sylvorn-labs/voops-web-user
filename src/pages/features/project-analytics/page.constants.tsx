import {
  Briefcase01Icon,
  Calendar01Icon,
  ChartHistogramIcon,
  Flag01Icon,
  Folder02Icon,
  Invoice01Icon,
  Target01Icon,
  TradeUpIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const projectAnalyticsConfig: FeaturePageConfig = {
  slug: 'project-analytics',
  badge: 'Project Profitability & P&L',
  titleLead: 'Measure Profit & Loss for Every',
  titleAccent: 'Client & Internal Project',
  description:
    'Track income milestones, contractor costs, and timeline budgets per project in real time. Know your exact net profit margin before the project wraps up.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: 'Real-Time',
      label: 'Project P&L',
      description: 'Calculated instantly as revenues and expenses are logged.',
    },
    {
      value: 'Timeline',
      label: 'Milestone Tracking',
      description: 'Start & end dates tied to delivery phases and budgets.',
    },
    {
      value: '0 Guesswork',
      label: 'Profit Margin Clarity',
      description: 'Detailed gross margin percentages per contract.',
    },
    {
      value: '100%',
      label: 'Pass-Through Traceability',
      description: 'Every expense linked to its respective project file.',
    },
  ],
  capabilitiesTitle: 'Full Financial Control Over Deliverables',
  capabilitiesDescription:
    'Stop waiting until tax season to learn whether a project was profitable. Monitor contract margins, contractor disbursements, and scope creep in real time.',
  capabilities: [
    {
      title: 'Dedicated Project P&L Dashboards',
      description:
        'Every project has its own financial overview tracking gross invoiced revenue, contractor costs, software expenses, and net margin.',
      icon: <HugeiconsIcon icon={Folder02Icon} className="size-6" />,
      tag: 'Core Feature',
    },
    {
      title: 'Timeline & Milestone Budgeting',
      description:
        'Set project start and target completion dates with phased budget allocations matching your delivery sprint cycles.',
      icon: <HugeiconsIcon icon={Calendar01Icon} className="size-6" />,
    },
    {
      title: 'Real-Time Margin Analytics',
      description:
        'Visual profit margin gauges that alert you when project expenditures threaten target profitability thresholds.',
      icon: <HugeiconsIcon icon={TradeUpIcon} className="size-6" />,
      tag: 'Profit Guard',
    },
    {
      title: 'Direct Expense & Receipt Attribution',
      description:
        'Assign freelancer invoices, software API usage, travel, and material costs directly to specific project budgets.',
      icon: <HugeiconsIcon icon={Invoice01Icon} className="size-6" />,
    },
    {
      title: 'Project Status Lifecycle',
      description:
        'Organize initiatives by status: Planning, Active, Paused, Completed, or Archived, keeping your active workspace focused.',
      icon: <HugeiconsIcon icon={Flag01Icon} className="size-6" />,
    },
    {
      title: 'Client-Ready Summary Exports',
      description:
        'Generate transparent cost breakdowns and milestone invoices ready to present to stakeholders and enterprise clients.',
      icon: <HugeiconsIcon icon={ChartHistogramIcon} className="size-6" />,
      tag: 'Export Ready',
    },
  ],
  workflowTitle: 'How Project Analytics Works',
  workflowDescription:
    'From initial contract scope to final profitability post-mortem.',
  workflowSteps: [
    {
      step: '01',
      title: 'Create Project & Set Budget Boundaries',
      description:
        'Initialize a project workspace with contract value, target profit margin, start date, and target delivery deadline.',
      bulletPoints: [
        'Set fixed-fee contract value or estimated retainer budget',
        'Assign target profit margin percentage (e.g. 45% net)',
        'Specify delivery milestones and team leads',
      ],
      icon: <HugeiconsIcon icon={Briefcase01Icon} className="size-6" />,
      previewCard: {
        badge: 'Project Financial Summary',
        title: 'Fintech Mobile Redesign',
        subtitle: 'Client: Apex Global \u2022 Status: Active',
        metrics: [
          { label: 'Contract Value', value: '$36,000.00', tone: 'income' },
          { label: 'Net Margin', value: '54.2%', tone: 'income' },
        ],
        items: [
          {
            title: 'Milestone 1: Wireframes & Discovery',
            detail: 'Invoiced & Paid \u2022 Completed',
            amount: '+$12,000.00',
            tone: 'income',
          },
          {
            title: 'Contractor Design Lead (35 hrs)',
            detail: 'Subcontractor Expense \u2022 UI Assets',
            amount: '-$3,500.00',
            tone: 'expense',
          },
          {
            title: 'Stock Assets & Prototyping License',
            detail: 'Pass-through Software Cost',
            amount: '-$420.00',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Attribute Income & Expenses in Real Time',
      description:
        'Whenever team members log contractor hours, tool licenses, or client milestone payments, tie them directly to the project.',
      bulletPoints: [
        'Instantly see budget consumption percentage',
        'Prevent budget overrun before final delivery',
        'Maintain complete receipt trails for client billing',
      ],
      icon: <HugeiconsIcon icon={Invoice01Icon} className="size-6" />,
      previewCard: {
        badge: 'Live Budget Health',
        title: 'Project Budget Consumption',
        subtitle: 'Total Budget: $16,500.00 Allocated',
        items: [
          {
            title: 'Expenditure to Date',
            detail: '62% of allocated budget used',
            amount: '$10,230.00',
            tone: 'neutral',
          },
          {
            title: 'Remaining Buffer',
            detail: '3 weeks until final milestone',
            amount: '$6,270.00',
            tone: 'income',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Analyze Final Margins & Historical Data',
      description:
        'When the project concludes, archive the project and use the historical data to bid more accurately on future proposals.',
      bulletPoints: [
        'Compare estimated vs. actual profit margins',
        'Identify which project types generate the highest ROI',
        'Export full historical audit trails for accounting',
      ],
      icon: <HugeiconsIcon icon={Target01Icon} className="size-6" />,
    },
  ],
  useCasesTitle: 'Who Relies on Project Analytics?',
  useCasesDescription:
    'Essential for project-based businesses, digital agencies, and general contractors.',
  useCases: [
    {
      target: 'Design & Dev Agencies',
      title: 'Fixed-Price & Milestone Contracts',
      description:
        'Eliminate scope creep by tracking design hours, contractor disbursements, and API costs against fixed client retainer fees.',
      highlights: [
        'Protect agency gross margins',
        'Clear subcontractor attribution',
        'One-click client cost transparency',
      ],
      icon: <HugeiconsIcon icon={Folder02Icon} className="size-5" />,
    },
    {
      target: 'Software Startups',
      title: 'R&D & CapEx Feature Initiatives',
      description:
        'Calculate true capital expenditure and engineering investments invested into building major new product modules.',
      highlights: [
        'R&D tax credit documentation',
        'Infrastructure cost attribution',
        'Feature ROI evaluation',
      ],
      icon: <HugeiconsIcon icon={TradeUpIcon} className="size-5" />,
    },
    {
      target: 'Consultancies & Studios',
      title: 'Client Expense Pass-Throughs',
      description:
        'Track travel, lodging, specialized tooling, and client-approved incidentals for seamless monthly reimbursement invoicing.',
      highlights: [
        'Zero lost billable expenses',
        'Attached receipt packages',
        'Speedy client approvals',
      ],
      icon: <HugeiconsIcon icon={Briefcase01Icon} className="size-5" />,
    },
  ],
  faqsTitle: 'Project Analytics FAQs',
  faqsDescription:
    'Answers to questions about milestone tracking, project P&L, and archiving.',
  faqs: [
    {
      question: 'How is Project P&L calculated in Voops?',
      answer:
        'Project P&L is calculated dynamically by summing all revenue transactions attributed to that project and subtracting all attributed expenses, contractor payouts, and pass-through costs.',
    },
    {
      question: 'Can I track both internal and client-facing projects?',
      answer:
        'Yes. You can tag projects as Internal (such as Website Redesign or Office Move) or Client Billable (such as Enterprise App Build) to separate overhead from revenue-generating work.',
    },
    {
      question: 'Can I assign start and end dates to projects?',
      answer:
        'Yes. Every project supports target start and end dates, milestone schedules, and status tracking (Planning, Active, Completed, Archived).',
    },
    {
      question: 'Can I export project financial statements for client reviews?',
      answer:
        'Yes. You can export complete project-level reports detailing all revenues, expense line items, attached receipts, and net margins.',
    },
  ],
};
