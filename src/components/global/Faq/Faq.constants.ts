import type { FaqItem } from './faq.d';

export const defaultFaqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What makes Voops different from standard expense trackers?',
    answer:
      'Voops is purpose-built from the ground up for multi-business founders, agencies, and freelancers. You can manage multiple distinct companies, bank/cash accounts, projects, team members, and categories under a single account with complete data isolation.',
  },
  {
    id: 'faq-2',
    question: 'Is Voops completely open source?',
    answer:
      'Yes! Voops is an open-source financial tracking platform crafted by Sylvorn Labs. You have full transparency over your data, can audit the source code on GitHub, and self-host if desired.',
  },
  {
    id: 'faq-3',
    question: 'How does data synchronization between devices work?',
    answer:
      'Voops utilizes Supabase as its real-time database and authentication engine. Any expense or transaction logged on your Flutter mobile app or React web browser is synchronized within milliseconds across all connected sessions.',
  },
  {
    id: 'faq-4',
    question: 'Can I invite team members with restricted access?',
    answer:
      'Yes. Voops features granular role-based access control. You can grant teammates specific permissions (e.g. submit receipts or view a single project budget) without revealing executive balances, other businesses, or payroll accounts.',
  },
  {
    id: 'faq-5',
    question: 'What platforms is Voops available on?',
    answer:
      'Voops is available as a modern web application for desktop browsers, and as a native mobile application built with Flutter for iOS (iPhone/iPad) and Android devices.',
  },
  {
    id: 'faq-6',
    question: 'Can I export my financial data and statements for tax filing?',
    answer:
      'Absolutely. You can filter and export comprehensive transaction histories, category breakdowns, and project P&L summaries in CSV, Excel, or PDF formats anytime with a single click.',
  },
];
