import type { ComponentType } from 'react';

export interface LogoItem {
  name: string;
  icon?: ComponentType<{ className?: string }>;
  src?: string;
  alt?: string;
  srcDark?: string;
  className?: string;
  href?: string;
}

export interface LogosProps {
  logos?: LogoItem[];
  className?: string;
  maxLogos?: number;
}
