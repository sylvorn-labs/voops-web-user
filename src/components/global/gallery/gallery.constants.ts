import type { GalleryItem } from './gallery.d';

export const defaultItems: GalleryItem[] = [
  {
    id: 'item-1',
    title: 'Multi-Business Master Dashboard',
    summary:
      'Switch effortlessly between corporate entities, agencies, and side projects with instant balance aggregation.',
    url: '/register',
    image: '/images/illustrations/dashboard.svg',
  },
  {
    id: 'item-2',
    title: 'Real-Time Project P&L & Budgeting',
    summary:
      'Track client project profitability, milestones, contractor expenses, and revenue margins without messy spreadsheets.',
    url: '/register',
    image: '/images/illustrations/growth_analytics.svg',
  },
  {
    id: 'item-3',
    title: 'Category Intelligence & Cash Flow Analytics',
    summary:
      'Deep dive into recurring SaaS subscriptions, operating costs, and tax-deductible expense distributions.',
    url: '/register',
    image: '/images/illustrations/visual_data.svg',
  },
  {
    id: 'item-4',
    title: 'Granular Role-Based Team Permissions',
    summary:
      'Invite teammates, managers, and external accountants with strict role restrictions and comprehensive audit logs.',
    url: '/register',
    image: '/images/illustrations/authentication.svg',
  },
  {
    id: 'item-5',
    title: 'Sub-Second Cross-Platform Sync',
    summary:
      'Snap receipts on iOS and Android via Flutter with instant synchronization directly to your React desktop workspace.',
    url: '/register',
    image: '/images/illustrations/transfer_files.svg',
  },
];
