import { Pricing } from './components/Pricing';
import { Community } from '@/components/global/Community';
import { Faq } from '@/components/global/Faq';
import { pricingFaqs } from './Page.constants';

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
