import {
  FileValidationIcon,
  HierarchyIcon,
  LockPasswordIcon,
  SecurityCheckIcon,
  Shield02Icon,
  UserCheck01Icon,
  UserGroupIcon,
  UserMultiple02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { FeaturePageConfig } from '../features.types';

export const teamCollaborationConfig: FeaturePageConfig = {
  slug: 'team-collaboration',
  badge: 'Role-Based Access Control',
  titleLead: 'Empower Your Team with',
  titleAccent: 'Granular Financial Permissions',
  description:
    'Delegate expense tracking, receipt uploads, and budget approvals while keeping sensitive salary details and bank accounts securely restricted.',
  imageLight:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png',
  imageDark:
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png',
  metrics: [
    {
      value: '4 Roles',
      label: 'Standard Hierarchy',
      description: 'Owner, Admin, Member, and Auditor/Viewer access tiers.',
    },
    {
      value: '100%',
      label: 'Audit Traceability',
      description: 'Every transaction change stamped with user attribution.',
    },
    {
      value: '0 Leaks',
      label: 'Sensitive Ledger Isolation',
      description: 'Restrict bank account balances from general staff.',
    },
    {
      value: '< 1 min',
      label: 'Member Onboarding',
      description: 'Instant email invitations with role pre-assignment.',
    },
  ],
  capabilitiesTitle: 'Enterprise-Grade Permissions & Audit Readiness',
  capabilitiesDescription:
    'Protect sensitive financials while enabling team members to log receipts, claim expenses, and manage project deliverables.',
  capabilities: [
    {
      title: 'Granular Role-Based Access (RBAC)',
      description:
        'Assign Owner, Admin, Member, or Viewer roles. Control exactly who can view, create, edit, approve, or delete transactions.',
      icon: <HugeiconsIcon icon={HierarchyIcon} className="size-6" />,
      tag: 'Security Core',
    },
    {
      title: 'Member-Attributed Transactions',
      description:
        'Every logged expense, uploaded invoice, or budget update is automatically tied to the creator for end-to-end accountability.',
      icon: <HugeiconsIcon icon={UserCheck01Icon} className="size-6" />,
      tag: 'Accountability',
    },
    {
      title: 'Sensitive Account Masking',
      description:
        'Hide primary bank account balances and confidential expense streams from general staff while letting them record line items.',
      icon: <HugeiconsIcon icon={LockPasswordIcon} className="size-6" />,
    },
    {
      title: 'Instant Email Invitations',
      description:
        'Invite co-founders, bookkeepers, project leads, or remote freelancers directly via email with automatic workspace onboarding.',
      icon: <HugeiconsIcon icon={UserMultiple02Icon} className="size-6" />,
    },
    {
      title: 'Read-Only Auditor Access',
      description:
        'Grant your external CPA or tax consultant read-only visibility into transaction logs without risking accidental data modifications.',
      icon: <HugeiconsIcon icon={ViewIcon} className="size-6" />,
    },
    {
      title: 'Immutable Audit Trails',
      description:
        'Full historical audit logs with timestamps and IP records for compliance, dispute resolution, and investor due diligence.',
      icon: <HugeiconsIcon icon={FileValidationIcon} className="size-6" />,
      tag: 'Compliance',
    },
  ],
  workflowTitle: 'Effortless Team Collaboration Workflow',
  workflowDescription:
    'From role assignment to daily expense reviews, collaborate safely without administrative friction.',
  workflowSteps: [
    {
      step: '01',
      title: 'Invite Team Members by Role',
      description:
        'Send secure invitations to team members and pre-select their permission level tailored to their responsibilities.',
      bulletPoints: [
        'Assign Owner, Admin, Member, or Viewer privileges',
        'Scoped strictly to the selected business workspace',
        'Revoke or elevate permissions with one click',
      ],
      icon: <HugeiconsIcon icon={UserGroupIcon} className="size-6" />,
      previewCard: {
        badge: 'Team Directory',
        title: 'Sylvorn Labs Core Team',
        subtitle: '6 Active Members \u2022 1 Pending Invite',
        items: [
          {
            title: 'Alex Mercer (Founder)',
            detail: 'Full Billing & Workspace Control',
            amount: 'Owner',
            tone: 'income',
          },
          {
            title: 'Sarah Jenkins (Finance Lead)',
            detail: 'Ledgers, Approvals & Bank Sync',
            amount: 'Admin',
            tone: 'info',
          },
          {
            title: 'David Chen (Design Lead)',
            detail: 'Project Budgets & Receipt Uploads',
            amount: 'Member',
            tone: 'neutral',
          },
        ],
      },
    },
    {
      step: '02',
      title: 'Delegate Daily Recordkeeping',
      description:
        'Enable staff to snap receipt photos, input reimbursement requests, and assign costs to designated project budgets.',
      bulletPoints: [
        'Team members only see relevant categories and projects',
        'Automatic receipt attachment & optical reading',
        'Instant mobile notification on status updates',
      ],
      icon: <HugeiconsIcon icon={SecurityCheckIcon} className="size-6" />,
      previewCard: {
        badge: 'Recent Submissions',
        title: 'Team Expense Log',
        subtitle: 'Today \u2022 3 New Entries',
        items: [
          {
            title: 'AWS Infrastructure Bill (David C.)',
            detail: 'Project: Cloud Migration \u2022 Tag: Hosting',
            amount: '$420.00',
            tone: 'expense',
          },
          {
            title: 'Client Lunch Catering (Elena R.)',
            detail: 'Category: Meals & Entertainment',
            amount: '$86.50',
            tone: 'expense',
          },
        ],
      },
    },
    {
      step: '03',
      title: 'Review, Approve & Reconcile',
      description:
        'Admins and Owners inspect submitted expenses, verify attached receipts, and commit verified items to the master ledger.',
      bulletPoints: [
        'Prevent duplicate or unauthorized charges',
        'Instant reimbursement status updates for staff',
        'Exportable audit trails for quarterly tax review',
      ],
      icon: <HugeiconsIcon icon={Shield02Icon} className="size-6" />,
    },
  ],
  useCasesTitle: 'How Modern Teams Use Voops Collaboration',
  useCasesDescription:
    'Customized permission setups for startups, remote teams, and accounting firms.',
  useCases: [
    {
      target: 'Growing Startups',
      title: 'Founder & Employee Spending Control',
      description:
        'Let your marketing, engineering, and sales leads log their own tool subscriptions and travel costs with complete spending visibility.',
      highlights: [
        'No shared credit card chaos',
        'Individual department budget tracking',
        'Quick expense reimbursement runs',
      ],
      icon: <HugeiconsIcon icon={UserGroupIcon} className="size-5" />,
    },
    {
      target: 'Agencies & Consultancies',
      title: 'Client-Specific Project Teams',
      description:
        'Assign designers and developers to specific client accounts without granting them access to high-level company profit margins.',
      highlights: [
        'Restricted project-level visibility',
        'Transparent contractor hour/cost logging',
        'Client-ready line-item billing',
      ],
      icon: <HugeiconsIcon icon={HierarchyIcon} className="size-5" />,
    },
    {
      target: 'External CPAs & Bookkeepers',
      title: 'Frictionless Accountant Collaboration',
      description:
        'Give your external accountant dedicated viewer or auditor access so they can export tax packages without asking for your password.',
      highlights: [
        'Zero security risks from credential sharing',
        'Direct access to receipts and reconciled ledgers',
        'Instant CSV / Excel / PDF data pulls',
      ],
      icon: <HugeiconsIcon icon={FileValidationIcon} className="size-5" />,
    },
  ],
  faqsTitle: 'Team Collaboration FAQs',
  faqsDescription:
    'Everything you need to know about user seats, access rules, and data privacy.',
  faqs: [
    {
      question: 'Can I restrict what accounts team members can see?',
      answer:
        'Yes. Members and standard users can be restricted from seeing core bank balances or sensitive owner equity accounts while still having permission to log daily expenses.',
    },
    {
      question: 'What happens when an employee leaves the company?',
      answer:
        'You can immediately revoke a team member’s access with a single click. Their previous transaction history and audit trail remain preserved in your records.',
    },
    {
      question: 'Can external bookkeepers access our account securely?',
      answer:
        'Yes. You can invite your bookkeeper or CPA with the Auditor/Viewer role, giving them access to reports, ledgers, and receipts without allowing modifications.',
    },
    {
      question: 'Are changes made by team members logged?',
      answer:
        'Yes. Voops maintains an immutable audit log detailing who created, updated, or deleted any transaction, category, or project record.',
    },
  ],
};
