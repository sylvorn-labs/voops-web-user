import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { accountAnalyticsConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
import { Download } from '@/components/global/download/Download';

export function AccountAnalyticsFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={accountAnalyticsConfig.badge}
        titleLead={accountAnalyticsConfig.titleLead}
        titleAccent={accountAnalyticsConfig.titleAccent}
        description={accountAnalyticsConfig.description}
        imageLight={accountAnalyticsConfig.imageLight}
        imageDark={accountAnalyticsConfig.imageDark}
      />

      <FeatureMetrics metrics={accountAnalyticsConfig.metrics} />

      <FeatureCapabilities
        id="account-analytics-capabilities"
        badge="Multi-Account Intelligence"
        heading={accountAnalyticsConfig.capabilitiesTitle}
        description={accountAnalyticsConfig.capabilitiesDescription}
        capabilities={accountAnalyticsConfig.capabilities}
      />

      <FeatureWorkflow
        id="account-analytics-workflow"
        heading={accountAnalyticsConfig.workflowTitle}
        description={accountAnalyticsConfig.workflowDescription}
        steps={accountAnalyticsConfig.workflowSteps}
      />

      <FeatureUseCases
        id="account-analytics-use-cases"
        heading={accountAnalyticsConfig.useCasesTitle}
        description={accountAnalyticsConfig.useCasesDescription}
        useCases={accountAnalyticsConfig.useCases}
      />

      <Faq
        id="account-analytics-faq"
        heading={accountAnalyticsConfig.faqsTitle}
        description={accountAnalyticsConfig.faqsDescription}
        items={accountAnalyticsConfig.faqs}
      />

      <RelatedFeatures currentSlug={accountAnalyticsConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
