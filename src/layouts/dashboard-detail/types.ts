import type { ReactNode } from 'react';

import type { PageHeaderProps } from '@/components/dashboard/page-header/page-header';

export interface DetailsTabConfig {
  value: string;
  label: ReactNode;
  content: ReactNode;
}

export interface DetailsLayoutProps {
  header: PageHeaderProps;
  defaultTab: string;
  tabs: DetailsTabConfig[];
  children?: ReactNode;
}
