import {
  AccountSetting01Icon,
  ComputerIcon,
  ShieldIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';

import type { IconSvgElement } from '@hugeicons/react';
import { useNavigate } from 'react-router';

interface NavItem {
  icon: IconSvgElement;
  label: string;
  tab: string;
  onSelect: () => void;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export function useNavigationItems(): NavGroup[] {
  const navigate = useNavigate();

  return [
    {
      heading: 'My Account',
      items: [
        {
          icon: AccountSetting01Icon,
          label: 'Overview',
          tab: 'overview',
          onSelect: () => navigate('/dashboard/settings?tab=overview'),
        },
        {
          icon: UserIcon,
          label: 'Profile',
          tab: 'profile',
          onSelect: () => navigate('/dashboard/settings?tab=profile'),
        },
        {
          icon: ShieldIcon,
          label: 'Security',
          tab: 'security',
          onSelect: () => navigate('/dashboard/settings?tab=security'),
        },
        {
          icon: ComputerIcon,
          label: 'Sessions',
          tab: 'sessions',
          onSelect: () => navigate('/dashboard/settings?tab=sessions'),
        },
      ],
    },
  ];
}
