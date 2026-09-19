import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { teamCollaborationConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Download } from '@/components/global/download/Download';

export function TeamCollaborationFeaturePage() {
  return (
    <>
      <FeatureHero
        badge={teamCollaborationConfig.badge}
        titleLead={teamCollaborationConfig.titleLead}
        titleAccent={teamCollaborationConfig.titleAccent}
        description={teamCollaborationConfig.description}
        imageLight={teamCollaborationConfig.imageLight}
        imageDark={teamCollaborationConfig.imageDark}
      />

      <FeatureMetrics metrics={teamCollaborationConfig.metrics} />

      <FeatureCapabilities
        id="team-capabilities"
        badge="Collaboration Tools"
        heading={teamCollaborationConfig.capabilitiesTitle}
        description={teamCollaborationConfig.capabilitiesDescription}
        capabilities={teamCollaborationConfig.capabilities}
      />

      <FeatureWorkflow
        id="team-workflow"
        heading={teamCollaborationConfig.workflowTitle}
        description={teamCollaborationConfig.workflowDescription}
        steps={teamCollaborationConfig.workflowSteps}
      />

      <FeatureUseCases
        id="team-use-cases"
        heading={teamCollaborationConfig.useCasesTitle}
        description={teamCollaborationConfig.useCasesDescription}
        useCases={teamCollaborationConfig.useCases}
      />

      <Faq
        id="team-faq"
        heading={teamCollaborationConfig.faqsTitle}
        description={teamCollaborationConfig.faqsDescription}
        items={teamCollaborationConfig.faqs}
      />

      <RelatedFeatures currentSlug={teamCollaborationConfig.slug} />

      <Download />
    </>
  );
}
