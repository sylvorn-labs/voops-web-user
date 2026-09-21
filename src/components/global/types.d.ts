import type { IconSvgElement } from '@hugeicons/react';

interface GlobalAction {
  label: string;
  icon: IconSvgElement;
  onClick: () => void;
}

export interface LoadingProps {
  message: string;
  className?: string;
}

export interface EmptyProps {
  icon?: IconSvgElement;
  title?: string;
  description?: string;
  primaryAction?: GlobalAction;
  secondaryAction?: GlobalAction;
}

export interface ErrorProps {
  icon?: IconSvgElement;
  title?: string;
  description?: string;
  primaryAction?: GlobalAction;
  secondaryAction?: GlobalAction;
}
