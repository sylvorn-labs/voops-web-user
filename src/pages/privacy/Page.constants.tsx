import { Lock } from 'lucide-react';
import type { ResourceSidebarConfig } from '@/layouts/resource/ResourceLayout.d';

export const privacySidebarConfig: ResourceSidebarConfig = {
  badgeLabel: 'Privacy Notice',
  badgeIcon: <Lock className="mr-2 size-3.5" />,
  cardTitle: 'Voops Privacy & Security Charter',
  cardDescription:
    'How Voops and Sylvorn Labs collect, encrypt, isolate, and safeguard your personal and multi-business financial data.',
  readTime: '5 minutes',
  pdfButtonText: 'Download Policy PDF',
  printButtonText: 'Print Policy',
};
