import { Pricing } from '@/pages/home/components/Pricing';
import { Faq } from '@/pages/home/components/Faq';
import { Community } from '@/pages/home/components/Community';

const pricingFaqs = [
  {
    id: 'pricing-1',
    question: 'Is Voops really 100% free and open-source?',
    answer:
      'Yes! The core Voops platform is completely open source under a permissive license. You can self-host it, run it on your own Supabase instance, or use our managed community cloud without paying a dime.',
  },
  {
    id: 'pricing-2',
    question:
      'Are there limits on how many businesses or accounts I can create?',
    answer:
      'Zero limits. You can create as many business entities, bank accounts, project budgets, and category tags as your operations require.',
  },
  {
    id: 'pricing-3',
    question: 'Can I invite accountants and external collaborators?',
    answer:
      'Yes! You can invite unlimited team members and assign granular role-based permissions (Owner, Admin, Member, Viewer) to keep sensitive balances protected.',
  },
  {
    id: 'pricing-4',
    question: 'How do you handle data export and ownership?',
    answer:
      'You maintain 100% data sovereignty. Export your transactions, ledgers, and receipts anytime in standard JSON, CSV, Excel, or PDF formats.',
  },
];

export function PricingPage() {
  return (
    <>
      <Pricing />
      <Faq
        id="pricing-faq"
        heading="Pricing & Plan Questions"
        description="Everything you need to know about our open-source model and data freedom."
        items={pricingFaqs}
      />
      <Community />
    </>
  );
}
