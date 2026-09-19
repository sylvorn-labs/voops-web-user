import { Contact } from './components/contact/Contact';

import { Faq } from '@/components/global/faq/Faq';
import { Community } from '@/components/global/community/Community';

const contactFaqs = [
  {
    id: 'contact-faq-1',
    question: 'How quickly does the Sylvorn Labs team respond?',
    answer:
      'Our team responds to all inquiries within 24 hours on business days. For urgent security or technical issues, email support@labs.sylvorn.com for priority triage.',
  },
  {
    id: 'contact-faq-2',
    question: 'Where can I report a bug or suggest a new feature?',
    answer:
      'We track all bug reports and feature suggestions publicly on GitHub issues and discussions at https://github.com/Sylvorn-Labs/voops-web-user.',
  },
  {
    id: 'contact-faq-3',
    question: 'Do you offer dedicated self-hosting support?',
    answer:
      'Yes. For teams requiring guidance on self-hosting Supabase or deploying custom configurations, reach out to hello@labs.sylvorn.com.',
  },
];

export function ContactPage() {
  return (
    <>
      <Contact id="contact" />
      <Faq
        id="contact-faq"
        heading="Support & Communication FAQs"
        description="Quick answers about how our engineering and support teams collaborate with users."
        items={contactFaqs}
      />
      <Community />
    </>
  );
}
