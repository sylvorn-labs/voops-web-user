import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { multiBusinessConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
import { Download } from '@/components/global/download/Download';

export function MultiBusinessFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={multiBusinessConfig.badge}
        titleLead={multiBusinessConfig.titleLead}
        titleAccent={multiBusinessConfig.titleAccent}
        description={multiBusinessConfig.description}
        imageLight={multiBusinessConfig.imageLight}
        imageDark={multiBusinessConfig.imageDark}
      />

      <FeatureMetrics metrics={multiBusinessConfig.metrics} />

      <FeatureCapabilities
        id="multi-business-capabilities"
        badge="Multi-Tenant Tools"
        heading={multiBusinessConfig.capabilitiesTitle}
        description={multiBusinessConfig.capabilitiesDescription}
        capabilities={multiBusinessConfig.capabilities}
      />

      <FeatureWorkflow
        id="multi-business-workflow"
        heading={multiBusinessConfig.workflowTitle}
        description={multiBusinessConfig.workflowDescription}
        steps={multiBusinessConfig.workflowSteps}
      />

      <FeatureUseCases
        id="multi-business-use-cases"
        heading={multiBusinessConfig.useCasesTitle}
        description={multiBusinessConfig.useCasesDescription}
        useCases={multiBusinessConfig.useCases}
      />

      <Faq
        id="multi-business-faq"
        heading={multiBusinessConfig.faqsTitle}
        description={multiBusinessConfig.faqsDescription}
        items={multiBusinessConfig.faqs}
      />

      <RelatedFeatures currentSlug={multiBusinessConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
