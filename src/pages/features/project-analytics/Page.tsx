import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { projectAnalyticsConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
import { Download } from '@/components/global/download/Download';

export function ProjectAnalyticsFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={projectAnalyticsConfig.badge}
        titleLead={projectAnalyticsConfig.titleLead}
        titleAccent={projectAnalyticsConfig.titleAccent}
        description={projectAnalyticsConfig.description}
        imageLight={projectAnalyticsConfig.imageLight}
        imageDark={projectAnalyticsConfig.imageDark}
      />

      <FeatureMetrics metrics={projectAnalyticsConfig.metrics} />

      <FeatureCapabilities
        id="project-analytics-capabilities"
        badge="Initiative P&L"
        heading={projectAnalyticsConfig.capabilitiesTitle}
        description={projectAnalyticsConfig.capabilitiesDescription}
        capabilities={projectAnalyticsConfig.capabilities}
      />

      <FeatureWorkflow
        id="project-analytics-workflow"
        heading={projectAnalyticsConfig.workflowTitle}
        description={projectAnalyticsConfig.workflowDescription}
        steps={projectAnalyticsConfig.workflowSteps}
      />

      <FeatureUseCases
        id="project-analytics-use-cases"
        heading={projectAnalyticsConfig.useCasesTitle}
        description={projectAnalyticsConfig.useCasesDescription}
        useCases={projectAnalyticsConfig.useCases}
      />

      <Faq
        id="project-analytics-faq"
        heading={projectAnalyticsConfig.faqsTitle}
        description={projectAnalyticsConfig.faqsDescription}
        items={projectAnalyticsConfig.faqs}
      />

      <RelatedFeatures currentSlug={projectAnalyticsConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
