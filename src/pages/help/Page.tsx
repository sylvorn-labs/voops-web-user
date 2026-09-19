import { Help } from './components/help/Help';

import { Faq } from '@/components/global/faq/Faq';
import { Community } from '@/components/global/community/Community';

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
