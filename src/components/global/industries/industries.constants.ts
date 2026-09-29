import type { Easing } from 'motion/react';

import type { IndustryItem } from './industries.d';

export const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

export const defaultIndustries: IndustryItem[] = [
  {
    name: 'Agencies & Studios',
    description:
      'Manage multiple client projects, track contractor expenses, and monitor exact project profitability without mixing client financials.',
    image:
      'https://images.unsplash.com/photo-1542089363-bba089ffaa25?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Agencies and creative studios',
    url: '#features',
  },
  {
    name: 'Multi-Brand Founders',
    description:
      'Consolidate finances across multiple incorporated entities and online stores with segregated balance accounts and a unified single login.',
    image:
      'https://images.unsplash.com/photo-1758598497628-942ad38a6dc4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Multi-brand founders and operators',
    url: '#features',
  },
  {
    name: 'Freelancers & Creators',
    description:
      'Categorize business expenses, track deductible write-offs, and generate ready-to-file quarterly reports in seconds.',
    image:
      'https://images.unsplash.com/photo-1581387490232-2181c3736353?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Freelancers and independent creators',
    url: '#features',
  },
  {
    name: 'Startups & Core Teams',
    description:
      'Assign granular role-based permissions, delegate receipt captures to teammates, and maintain transparent audit trails.',
    image:
      'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Startups and collaborative teams',
    url: '#features',
  },
];
