import { Pricing } from './components/pricing/Pricing';
import { Community } from '@/components/global/community/Community';
import { Faq } from '@/components/global/faq/Faq';
import { pricingFaqs } from './page.constants';

export function PricingPage() {
  return (
    <>
      <Pricing />
      <Faq
        id="pricing-faq"
        heading="Pricing & Plan Questions"
        description="Everything you need to know about our beta access and future managed cloud options."
        items={pricingFaqs}
      />
      <Community />
    </>
  );
}
