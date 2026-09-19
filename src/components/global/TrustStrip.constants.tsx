import {
  Building01Icon,
  FlashIcon,
  GithubIcon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { TrustItem } from './TrustStrip.d';

export const defaultItems: TrustItem[] = [
  {
    icon: <HugeiconsIcon icon={GithubIcon} className="size-5" />,
    title: '100% Open Source',
    description: 'Public codebase by Sylvorn Labs',
  },
  {
    icon: <HugeiconsIcon icon={SecurityCheckIcon} className="size-5" />,
    title: 'Strict Privacy',
    description: 'Your financial data stays yours',
  },
  {
    icon: <HugeiconsIcon icon={Building01Icon} className="size-5" />,
    title: 'Multi-Business',
    description: 'Unlimited ventures & accounts',
  },
  {
    icon: <HugeiconsIcon icon={FlashIcon} className="size-5" />,
    title: 'Real-Time Sync',
    description: 'Instant Supabase cloud sync',
  },
];
