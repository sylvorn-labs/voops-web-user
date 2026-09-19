import {
  Building01Icon,
  Download01Icon,
  FlashIcon,
  GithubIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { IncentiveItem } from './Incentives.d';

export const defaultIncentives: IncentiveItem[] = [
  {
    id: '1',
    title: 'Zero Vendor Lock-in',
    text: 'Export SQL, JSON & CSV backups anytime with full data ownership.',
    icon: (
      <HugeiconsIcon icon={Download01Icon} className="text-primary size-7" />
    ),
  },
  {
    id: '2',
    title: 'Real-time Mobile Sync',
    text: 'Instant sub-second synchronization across iOS and Android apps.',
    icon: <HugeiconsIcon icon={FlashIcon} className="text-income size-7" />,
  },
  {
    id: '3',
    title: 'Multi-Tenant Architecture',
    text: 'Manage unlimited business ledgers and separate bank accounts.',
    icon: (
      <HugeiconsIcon icon={Building01Icon} className="text-primary size-7" />
    ),
  },
  {
    id: '4',
    title: 'Community Backed',
    text: 'Transparent roadmap and open source commits by Sylvorn Labs.',
    icon: (
      <HugeiconsIcon icon={GithubIcon} className="text-foreground size-7" />
    ),
  },
];
