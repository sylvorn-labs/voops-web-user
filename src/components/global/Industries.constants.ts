import type { Easing } from 'motion/react';

import type { IndustryItem } from './Industries.d';

export const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

export const defaultIndustries: IndustryItem[] = [
  {
    name: 'Agencies & Studios',
    description:
      'Manage multiple client projects, track contractor expenses, and monitor exact project profitability without mixing client financials.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
    imageAlt: 'Agencies illustration',
    url: '#features',
  },
  {
    name: 'Multi-Brand Founders',
    description:
      'Consolidate finances across multiple incorporated entities and online stores with segregated balance accounts and a unified single login.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
    imageAlt: 'Founders illustration',
    url: '#features',
  },
  {
    name: 'Freelancers & Creators',
    description:
      'Categorize business expenses, track deductible write-offs, and generate ready-to-file quarterly reports in seconds.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
    imageAlt: 'Freelancers illustration',
    url: '#features',
  },
  {
    name: 'Startups & Core Teams',
    description:
      'Assign granular role-based permissions, delegate receipt captures to teammates, and maintain transparent audit trails.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
    imageAlt: 'Startups illustration',
    url: '#features',
  },
];
