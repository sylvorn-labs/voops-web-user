import type { BlogPost } from './blog.d';

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'multi-business-finances',
    title: 'Mastering Multi-Business Expense Tracking Without the Chaos',
    summary:
      'How serial entrepreneurs and studio founders manage multiple distinct business entities, tax IDs, and split ledgers within a unified workspace.',
    label: 'Architecture',
    author: 'Sarah Chen',
    published: '18 Sep 2026',
    url: '/features/multi-business',
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'automated-receipt-ocr',
    title: 'Automated Receipt Parsing: Eliminating Manual Ledger Entry',
    summary:
      'Deep dive into our optical character recognition pipeline designed to extract vendor names, sub-totals, and line-item taxes instantly from smartphone photos.',
    label: 'Engineering',
    author: 'Marcus Rodriguez',
    published: '12 Sep 2026',
    url: '/features/account-analytics',
    image:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'team-permissions-governance',
    title: 'Designing Granular Permissions for Distributed Finance Teams',
    summary:
      'Best practices for configuring owner, admin, collaborator, and auditor roles across sensitive enterprise financial accounts without bottlenecks.',
    label: 'Security',
    author: 'Emma Thompson',
    published: '05 Sep 2026',
    url: '/features/team-collaboration',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'project-level-profitability',
    title: 'Real-Time Project Analytics: Tracking Client Margin Health',
    summary:
      'Gain immediate visibility into project profit & loss by attributing receipts, travel costs, and contractor fees directly to individual client initiatives.',
    label: 'Productivity',
    author: 'Alex Rivera',
    published: '28 Aug 2026',
    url: '/features/project-analytics',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'open-source-finance-stack',
    title: 'Why We Built Voops as an Open Source Financial Stack',
    summary:
      'Financial transparency begins with code transparency. Discover our rationale for choosing open architecture, self-host options, and modern web tooling.',
    label: 'Open Source',
    author: 'Sylvorn Labs Core',
    published: '15 Aug 2026',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'multi-currency-forex-insights',
    title: 'Navigating Cross-Border Transactions & Live Currency Conversion',
    summary:
      'Managing global teams and vendor payments with automated real-time exchange rates, avoiding unexpected currency conversion fees.',
    label: 'Finance Ops',
    author: 'Elena Rostova',
    published: '01 Aug 2026',
    url: '/features/category-organization',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  },
];
