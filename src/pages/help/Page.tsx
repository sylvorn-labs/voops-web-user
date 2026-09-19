import { Help } from './components/Help';

import { Faq } from '@/components/global/Faq';
import { Community } from '@/components/global/Community';

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
