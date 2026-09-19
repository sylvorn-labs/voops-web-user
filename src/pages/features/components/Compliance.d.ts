import type { ComponentType } from 'react';

export interface ComplianceBadge {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  image?: string;
  alt?: string;
}

export interface ComplianceFeature {
  title: string;
  description: string;
  icon?: ComponentType<{ className?: string }>;
  badgeImage?: string;
  badgeAlt?: string;
}

export interface ComplianceProps {
  id?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  badges?: ComplianceBadge[];
  features?: ComplianceFeature[];
  className?: string;
}
