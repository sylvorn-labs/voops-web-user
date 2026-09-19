import type { FaqItem } from '@/components/global/Faq/Faq.d';

export const pricingFaqs: FaqItem[] = [
  {
    id: 'pricing-1',
    question: 'Why is Voops currently free?',
    answer:
      'All features are completely free for a limited time during active development and beta testing. We want operators and teams to test, give feedback, and experience seamless expense tracking without paywalls.',
  },
  {
    id: 'pricing-2',
    question: 'What will pricing look like in the future?',
    answer:
      'In the future, managed cloud instances will offer paid tiers with options tailored for various team sizes and workloads. Self-hosting the open-source platform will remain freely available.',
  },
  {
    id: 'pricing-3',
    question:
      'Are there limits on how many businesses, wallets, or accounts I can create?',
    answer:
      'Zero limits. You can create as many business entities, bank accounts, petty cash stores, project budgets, and category tags as your operations require.',
  },
  {
    id: 'pricing-4',
    question: 'How do you handle data export and data ownership?',
    answer:
      'You maintain 100% data sovereignty. Export your transactions, ledgers, and receipts anytime in standard JSON, CSV, Excel, or PDF formats.',
  },
];
