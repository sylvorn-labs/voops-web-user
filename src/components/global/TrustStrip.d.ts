import type { ReactNode } from 'react';

export interface TrustItem {
  icon: ReactNode;
  title: string;
  description?: string;
}

export interface TrustStripProps {
  items?: TrustItem[];
  className?: string;
}
