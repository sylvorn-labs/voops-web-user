import { FeaturesMatrix } from '@/pages/home/components/FeaturesMatrix';
import { FeatureCardsGrid } from '@/pages/home/components/FeatureCardsGrid';
import { Industries } from '@/pages/home/components/Industries';
import { Compliance } from '@/pages/home/components/Compliance';
import { Faq } from '@/pages/home/components/Faq';
import { Download } from '@/pages/home/components/Download';

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
