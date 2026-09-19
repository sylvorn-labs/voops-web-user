import { ShieldCheck } from 'lucide-react';
import type { ResourceSidebarConfig } from '@/layouts/resource/resource-layout.d';

export const termsSidebarConfig: ResourceSidebarConfig = {
  badgeLabel: 'Legal Terms',
  badgeIcon: <ShieldCheck className="mr-2 size-3.5" />,
  cardTitle: 'Voops Master Terms of Service',
  cardDescription:
    'Official terms governing your use of Voops multi-business financial tracking applications and cloud services.',
  readTime: '6 minutes',
  pdfButtonText: 'Export PDF Agreement',
  printButtonText: 'Print Terms',
};
