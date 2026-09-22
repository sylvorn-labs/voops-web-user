import {
  Building02Icon,
  Contact01Icon,
  Folder02Icon,
  Home01Icon,
  Laptop,
  Moon,
  Sun,
  Tag01Icon,
  TransactionIcon,
  UserGroupIcon,
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
          label: 'Overview',
          icon: Home01Icon,
          onSelect: () => {
            navigate('/dashboard');
            close();
          },
        },
        {
          label: 'Businesses',
          icon: Building02Icon,
          onSelect: () => {
            navigate('/dashboard/businesses');
            close();
          },
        },
        {
          label: 'Transactions',
          icon: TransactionIcon,
          onSelect: () => {
            navigate('/dashboard/transactions');
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
        {
          label: 'Projects',
          icon: Folder02Icon,
          onSelect: () => {
            navigate('/dashboard/projects');
            close();
          },
        },
        {
          label: 'Parties',
          icon: Contact01Icon,
          onSelect: () => {
            navigate('/dashboard/parties');
            close();
          },
        },
        {
          label: 'Members',
          icon: UserGroupIcon,
          onSelect: () => {
            navigate('/dashboard/members');
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
