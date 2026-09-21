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
import type { TransactionListItem } from '@/types/api/transaction.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface TransactionRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onToggleArchive: (transaction: TransactionListItem) => void;
  onDeleteTransaction: (transaction: TransactionListItem) => void;
}

export function getTransactionRowActions({
  navigate,
  openSheet,
  onToggleArchive,
  onDeleteTransaction,
}: TransactionRowActionsOptions): RowActionConfig<TransactionListItem>[] {
  return [
    // ─── Group 1: View Actions ──────────────────────────────────────────
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: transaction => {
        openSheet({
          sheetKey: 'transaction',
          mode: 'view',
          id: transaction.id,
          title: transaction.description || 'Transaction Details',
          description: 'Transaction Overview',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: transaction => {
        navigate(`/dashboard/transactions/${transaction.id}`);
      },
    },

    // ─── Group 2: Edit & Archive Actions ────────────────────────────────
    {
      id: 'edit',
      label: 'Edit transaction',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: transaction => {
        openSheet({
          sheetKey: 'transaction',
          mode: 'edit',
          id: transaction.id,
          title: 'Edit Transaction',
          description: 'Update transaction details and categorizations.',
        });
      },
    },
    {
      id: 'toggle-archive',
      label: transaction =>
        transaction.is_archived ? 'Restore transaction' : 'Archive transaction',
      icon: transaction =>
        transaction.is_archived ? ArchiveRestoreIcon : Archive02Icon,
      separatorBefore: false,
      onClick: transaction => {
        onToggleArchive(transaction);
      },
    },

    // ─── Group 3: Delete Action ─────────────────────────────────────────
    {
      id: 'delete',
      label: 'Delete transaction',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: transaction => {
        onDeleteTransaction(transaction);
      },
    },
  ];
}
