import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { peopleAnalyticsConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
import { Download } from '@/components/global/download/Download';

export function PeopleAnalyticsFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={peopleAnalyticsConfig.badge}
        titleLead={peopleAnalyticsConfig.titleLead}
        titleAccent={peopleAnalyticsConfig.titleAccent}
        description={peopleAnalyticsConfig.description}
        imageLight={peopleAnalyticsConfig.imageLight}
        imageDark={peopleAnalyticsConfig.imageDark}
      />

      <FeatureMetrics metrics={peopleAnalyticsConfig.metrics} />

      <FeatureCapabilities
        id="people-analytics-capabilities"
        badge="Individual Attribution"
        heading={peopleAnalyticsConfig.capabilitiesTitle}
        description={peopleAnalyticsConfig.capabilitiesDescription}
        capabilities={peopleAnalyticsConfig.capabilities}
      />

      <FeatureWorkflow
        id="people-analytics-workflow"
        heading={peopleAnalyticsConfig.workflowTitle}
        description={peopleAnalyticsConfig.workflowDescription}
        steps={peopleAnalyticsConfig.workflowSteps}
      />

      <FeatureUseCases
        id="people-analytics-use-cases"
        heading={peopleAnalyticsConfig.useCasesTitle}
        description={peopleAnalyticsConfig.useCasesDescription}
        useCases={peopleAnalyticsConfig.useCases}
      />

      <Faq
        id="people-analytics-faq"
        heading={peopleAnalyticsConfig.faqsTitle}
        description={peopleAnalyticsConfig.faqsDescription}
        items={peopleAnalyticsConfig.faqs}
      />

      <RelatedFeatures currentSlug={peopleAnalyticsConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
