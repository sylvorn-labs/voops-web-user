import type { ReactNode } from 'react';

export interface FeatureMetricItem {
  value: string;
  label: string;
  description: string;
}

export interface FeatureCapabilityItem {
  title: string;
  description: string;
  icon: ReactNode;
  tag?: string;
}

export interface FeatureWorkflowStep {
  step: string;
  title: string;
  description: string;
  bulletPoints: string[];
  icon: ReactNode;
  previewCard?: {
    badge: string;
    title: string;
    subtitle?: string;
    metrics?: Array<{
      label: string;
      value: string;
      tone?: 'income' | 'expense' | 'info' | 'neutral';
    }>;
    items?: Array<{
      title: string;
      detail: string;
      amount?: string;
      tone?: 'income' | 'expense' | 'info' | 'neutral';
    }>;
  };
}

export interface FeatureUseCaseItem {
  target: string;
  title: string;
  description: string;
  highlights: string[];
  icon: ReactNode;
}

export interface FeatureFaqItem {
  question: string;
  answer: string;
}

export interface FeaturePageConfig {
  slug: string;
  badge: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  imageLight: string;
  imageDark: string;
  metrics: FeatureMetricItem[];
  capabilitiesTitle?: string;
  capabilitiesDescription?: string;
  capabilities: FeatureCapabilityItem[];
  workflowTitle?: string;
  workflowDescription?: string;
  workflowSteps: FeatureWorkflowStep[];
  useCasesTitle?: string;
  useCasesDescription?: string;
  useCases: FeatureUseCaseItem[];
  faqsTitle?: string;
  faqsDescription?: string;
  faqs: FeatureFaqItem[];
}
