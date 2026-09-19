import { FeatureCardsGrid } from './components/FeatureCardsGrid';
import { Compliance } from './components/Compliance';

import { FeaturesMatrix } from '@/components/global/FeaturesMatrix';
import { Industries } from '@/components/global/Industries';
import { Faq } from '@/components/global/Faq';
import { Download } from '@/components/global/Download';

export function FeaturesPage() {
  return (
    <>
      <FeaturesMatrix id="features-matrix" />
      <FeatureCardsGrid />
      <Industries />
      <Compliance />
      <Faq
        id="features-faq"
        heading="Feature & Workflow Questions"
        description="Deep dive into how Voops handles multi-company separation, permissions, and real-time ledger synchronization."
      />
      <Download />
    </>
  );
}
