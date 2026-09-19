import type { ReactNode } from 'react';

export interface CtaButton {
  text: string;
  url: string;
  icon?: ReactNode;
  isExternal?: boolean;
}

export interface CtaButtons {
  primary?: CtaButton;
  secondary?: CtaButton;
}

export interface CtaProps {
  id?: string;
  heading?: string;
  description?: string;
  buttons?: CtaButtons;
  className?: string;
}
