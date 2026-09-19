import { Compass } from 'lucide-react';
import type { ResourceSidebarConfig } from '@/layouts/resource/resource-layout.d';

export const roadmapSidebarConfig: ResourceSidebarConfig = {
  badgeLabel: 'Public Roadmap',
  badgeIcon: <Compass className="mr-2 size-3.5" />,
  cardTitle: 'Voops 2026-2027 Engineering Vision',
  cardDescription:
    'A transparent overview of completed releases, active developments, and planned upcoming features.',
  readTime: '4 minutes',
  pdfButtonText: 'Download Roadmap Summary',
  printButtonText: 'Print Roadmap',
};
