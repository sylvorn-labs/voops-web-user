import type { ReactNode } from 'react';

export interface ResourceSidebarConfig {
  badgeLabel?: string;
  badgeIcon?: ReactNode;
  cardTitle: string;
  cardDescription?: string;
  downloadLabel?: string;
  readTime?: string;
  onDownloadPdf?: () => void;
  pdfButtonText?: string;
  onPrint?: () => void;
  printButtonText?: string;
  shareTitle?: string;
  shareUrl?: string;
  extraSidebarContent?: ReactNode;
}

export interface ResourceLayoutProps {
  className?: string;
  sidebar?: ResourceSidebarConfig;
  title?: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}
