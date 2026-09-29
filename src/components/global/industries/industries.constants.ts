import type { Easing } from 'motion/react';

import type { IndustryItem } from './industries.d';

export const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

export const defaultIndustries: IndustryItem[] = [
  {
    name: 'Agencies & Studios',
    description:
      'Manage multiple client projects, track contractor expenses, and monitor exact project profitability without mixing client financials.',
    image: '/images/illustrations/creative_team.svg',
    imageAlt: 'Agencies illustration',
    url: '#features',
  },
  {
    name: 'Multi-Brand Founders',
    description:
      'Consolidate finances across multiple incorporated entities and online stores with segregated balance accounts and a unified single login.',
    image: '/images/illustrations/business_deal.svg',
    imageAlt: 'Founders illustration',
    url: '#features',
  },
  {
    name: 'Freelancers & Creators',
    description:
      'Categorize business expenses, track deductible write-offs, and generate ready-to-file quarterly reports in seconds.',
    image: '/images/illustrations/freelancer.svg',
    imageAlt: 'Freelancers illustration',
    url: '#features',
  },
  {
    name: 'Startups & Core Teams',
    description:
      'Assign granular role-based permissions, delegate receipt captures to teammates, and maintain transparent audit trails.',
    image: '/images/illustrations/startup_life.svg',
    imageAlt: 'Startups illustration',
    url: '#features',
  },
];
