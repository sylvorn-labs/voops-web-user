import { Help } from './components/Help/Help';

import { Faq } from '@/components/global/Faq/Faq';
import { Community } from '@/components/global/Community/Community';

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
