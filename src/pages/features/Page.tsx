import { FeatureCardsGrid } from './components/FeatureCardsGrid/FeatureCardsGrid';
import { Compliance } from './components/Compliance/Compliance';

import { FeaturesMatrix } from '@/components/global/FeaturesMatrix/FeaturesMatrix';
import { Industries } from '@/components/global/Industries/Industries';
import { Faq } from '@/components/global/Faq/Faq';
import { Download } from '@/components/global/Download/Download';

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
