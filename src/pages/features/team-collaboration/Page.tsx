import { FeatureHero } from '../components/feature-hero/FeatureHero';
import { FeatureMetrics } from '../components/feature-metrics/FeatureMetrics';
import { FeatureCapabilities } from '../components/feature-capabilities/FeatureCapabilities';
import { FeatureWorkflow } from '../components/feature-workflow/FeatureWorkflow';
import { FeatureUseCases } from '../components/feature-use-cases/FeatureUseCases';
import { RelatedFeatures } from '../components/related-features/RelatedFeatures';
import { teamCollaborationConfig } from './page.constants';

import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';
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
        id="team-collaboration-capabilities"
        badge="Governance & RBAC"
        heading={teamCollaborationConfig.capabilitiesTitle}
        description={teamCollaborationConfig.capabilitiesDescription}
        capabilities={teamCollaborationConfig.capabilities}
      />

      <FeatureWorkflow
        id="team-collaboration-workflow"
        heading={teamCollaborationConfig.workflowTitle}
        description={teamCollaborationConfig.workflowDescription}
        steps={teamCollaborationConfig.workflowSteps}
      />

      <FeatureUseCases
        id="team-collaboration-use-cases"
        heading={teamCollaborationConfig.useCasesTitle}
        description={teamCollaborationConfig.useCasesDescription}
        useCases={teamCollaborationConfig.useCases}
      />

      <Faq
        id="team-collaboration-faq"
        heading={teamCollaborationConfig.faqsTitle}
        description={teamCollaborationConfig.faqsDescription}
        items={teamCollaborationConfig.faqs}
      />

      <RelatedFeatures currentSlug={teamCollaborationConfig.slug} />

      <Cta />
      <Download />
    </>
  );
}
