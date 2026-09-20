import {
  DashboardCircleIcon,
  Laptop,
  Moon,
  Sun,
  Tag01Icon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { useNavigate } from 'react-router';

import { useSetTheme } from '@/stores/theme/theme.selectors';
import { useCmdClose } from '@/stores/cmd/cmd.selectors';

import type { CommandGroup, CommandType } from './cmd';

export function useCommands(): CommandGroup[] {
  const setTheme = useSetTheme();
  const navigate = useNavigate();
  const close = useCmdClose();

  return [
    {
      heading: 'Navigation',
      items: [
        {
          label: 'Dashboard',
          icon: DashboardCircleIcon,
          onSelect: () => {
            navigate('/dashboard');
            close();
          },
        },
        {
          label: 'Accounts',
          icon: Wallet02Icon,
          onSelect: () => {
            navigate('/dashboard/accounts');
            close();
          },
        },
        {
          label: 'Categories',
          icon: Tag01Icon,
          onSelect: () => {
            navigate('/dashboard/categories');
            close();
          },
        },
      ],
    },
    {
      heading: 'Theme',
      items: [
        {
          label: 'Light',
          icon: Sun,
          onSelect: () => {
            setTheme('light');
            close();
          },
        },
        {
          label: 'Dark',
          icon: Moon,
          onSelect: () => {
            setTheme('dark');
            close();
          },
        },
        {
          label: 'System',
          icon: Laptop,
          onSelect: () => {
            setTheme('system');
            close();
          },
        },
      ],
    },
  ];
}

export function useFlatCommands(): CommandType[] {
  const COMMANDS = useCommands();

  return COMMANDS.flatMap(group => group.items);
}
