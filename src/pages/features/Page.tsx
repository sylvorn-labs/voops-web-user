import { FeatureCardsGrid } from './components/feature-cards-grid/FeatureCardsGrid';
import { Compliance } from './components/compliance/Compliance';

import { FeaturesMatrix } from '@/components/global/features-matrix/FeaturesMatrix';
import { Industries } from '@/components/global/industries/Industries';
import { Faq } from '@/components/global/faq/Faq';
import { Download } from '@/components/global/download/Download';

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
