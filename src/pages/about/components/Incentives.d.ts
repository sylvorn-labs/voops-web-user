import type { ReactNode } from 'react';

export interface IncentiveItem {
  id: string;
  title: string;
  text: string;
  icon: ReactNode;
}

export interface IncentivesProps {
  id?: string;
  heading?: string;
  description?: string;
  incentives?: IncentiveItem[];
  className?: string;
}
