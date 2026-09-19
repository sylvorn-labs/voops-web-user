import { Help } from './components/Help';
import { Faq } from '@/pages/home/components/Faq';
import { Community } from '@/pages/home/components/Community';

export function HelpPage() {
  return (
    <>
      <Help />
      <Faq
        id="help-faq"
        heading="Common Help Inquiries"
        description="Frequently requested answers about workspace administration, multi-currency accounts, and receipt exports."
      />
      <Community />
    </>
  );
}
