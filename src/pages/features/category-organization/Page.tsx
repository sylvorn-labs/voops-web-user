import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { categoryOrganizationConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
import { Download } from '@/components/global/download/Download';

export function CategoryOrganizationFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={categoryOrganizationConfig.badge}
        titleLead={categoryOrganizationConfig.titleLead}
        titleAccent={categoryOrganizationConfig.titleAccent}
        description={categoryOrganizationConfig.description}
        imageLight={categoryOrganizationConfig.imageLight}
        imageDark={categoryOrganizationConfig.imageDark}
      />

      <FeatureMetrics metrics={categoryOrganizationConfig.metrics} />

      <FeatureCapabilities
        id="category-organization-capabilities"
        badge="Taxonomy & Tagging"
        heading={categoryOrganizationConfig.capabilitiesTitle}
        description={categoryOrganizationConfig.capabilitiesDescription}
        capabilities={categoryOrganizationConfig.capabilities}
      />

      <FeatureWorkflow
        id="category-organization-workflow"
        heading={categoryOrganizationConfig.workflowTitle}
        description={categoryOrganizationConfig.workflowDescription}
        steps={categoryOrganizationConfig.workflowSteps}
      />

      <FeatureUseCases
        id="category-organization-use-cases"
        heading={categoryOrganizationConfig.useCasesTitle}
        description={categoryOrganizationConfig.useCasesDescription}
        useCases={categoryOrganizationConfig.useCases}
      />

      <Faq
        id="category-organization-faq"
        heading={categoryOrganizationConfig.faqsTitle}
        description={categoryOrganizationConfig.faqsDescription}
        items={categoryOrganizationConfig.faqs}
      />

      <RelatedFeatures currentSlug={categoryOrganizationConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
