import type { FeaturesMatrixProps } from './FeaturesMatrix.d';

export const defaultProps: Required<Omit<FeaturesMatrixProps, 'className' | 'id'>> = {
  title: 'Engineered for Complete Financial Clarity',
  description:
    'Voops is designed to give you total visibility across every business venture, team member, project budget, and spending category in real time.',
  feature1: {
    title: 'Multi-Business & Multi-Account Architecture',
    description:
      'Manage multiple independent businesses, cash registers, and bank accounts from a single dashboard with zero friction.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
  feature2: {
    title: 'Team Collaboration & Permissions',
    description:
      'Invite team members to specific businesses with granular role-based access control, transaction approvals, and audit trails.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  feature3: {
    title: 'Project P&L & Budget Tracking',
    description:
      'Assign income and expense streams to project milestones with custom timelines and real-time profitability analytics.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  feature4: {
    title: 'Category & People Analytics',
    description:
      'Gain deep visual intelligence on your top spending categories, recurring vendor payouts, and individual team expense patterns.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
};
