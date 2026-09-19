import { FeatureCardsGrid } from './components/feature-cards-grid/FeatureCardsGrid';
import { Compliance } from './components/compliance/Compliance';
import { RelatedFeatures } from './components/related-features/RelatedFeatures';

import { FeaturesMatrix } from '@/components/global/features-matrix/FeaturesMatrix';
import { Industries } from '@/components/global/industries/Industries';
import { Faq } from '@/components/global/faq/Faq';
import { Download } from '@/components/global/download/Download';
import { Cta } from '@/components/global/cta/Cta';

export function FeaturesPage() {
  return (
    <>
      <FeaturesMatrix id="features-matrix" />
      <RelatedFeatures
        heading="Deep Dive into Core Capabilities"
        description="Select any feature module below to explore dedicated workflows, capabilities, role permissions, and metrics."
      />
      <FeatureCardsGrid />
      <Industries />
      <Compliance />
      <Faq
        id="features-faq"
        heading="Feature & Workflow Questions"
        description="Deep dive into how Voops handles multi-company separation, permissions, and real-time ledger synchronization."
      />
      <Cta />
      <Download />
    </>
  );
}
