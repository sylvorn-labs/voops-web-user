import { Contact } from './components/Contact';

import { Faq } from '@/components/global/Faq';
import { Community } from '@/components/global/Community';

const contactFaqs = [
  {
    id: 'contact-faq-1',
    question: 'How quickly does the Sylvorn Labs team respond?',
    answer:
      'Our team responds to all inquiries within 24 hours on business days. For urgent security issues, email security@sylvorn.com for priority triage.',
  },
  {
    id: 'contact-faq-2',
    question: 'Where can I report a bug or suggest a new feature?',
    answer:
      'We track all bug reports and feature suggestions publicly on GitHub issues and discussions. You can also join our open discussions directly.',
  },
  {
    id: 'contact-faq-3',
    question: 'Do you offer dedicated self-hosting enterprise support?',
    answer:
      'Yes. For large organizations requiring custom SLAs, dedicated database isolation, and migration support, contact our team at enterprise@sylvorn.com.',
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
