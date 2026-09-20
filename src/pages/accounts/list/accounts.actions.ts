import type { NavigateFunction } from 'react-router';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';

import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { AccountListItem } from '@/types/api/account.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface AccountRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onToggleArchive: (account: AccountListItem) => void;
  onDeleteAccount: (account: AccountListItem) => void;
}

export function getAccountRowActions({
  navigate,
  openSheet,
  onToggleArchive,
  onDeleteAccount,
}: AccountRowActionsOptions): RowActionConfig<AccountListItem>[] {
  return [
    // ─── Group 1: View Actions ───────────────────────────────────────────
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: account => {
        openSheet({
          sheetKey: 'account',
          mode: 'view',
          id: account.id,
          title: account.name,
          description: 'Account Information',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: account => {
        navigate(`/dashboard/accounts/${account.id}`);
      },
    },

    // ─── Group 2: Edit & Archive Actions ─────────────────────────────────
    {
      id: 'edit',
      label: 'Edit account',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: account => {
        openSheet({
          sheetKey: 'account',
          mode: 'edit',
          id: account.id,
          title: 'Edit Account',
          description: 'Update account details and balance.',
        });
      },
    },
    {
      id: 'toggle-archive',
      label: account =>
        account.is_archived ? 'Restore account' : 'Archive account',
      icon: account =>
        account.is_archived ? ArchiveRestoreIcon : Archive02Icon,
      separatorBefore: false,
      onClick: account => {
        onToggleArchive(account);
      },
    },

    // ─── Group 3: Delete Action ──────────────────────────────────────────
    {
      id: 'delete',
      label: 'Delete account',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: account => {
        onDeleteAccount(account);
      },
    },
  ];
}
