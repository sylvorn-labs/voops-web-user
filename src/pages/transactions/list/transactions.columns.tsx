import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type {
  TransactionListItem,
  TransactionType,
} from '@/types/api/transaction.d';
import { TransactionTypeBadge } from './components/transaction-type-badge/TransactionTypeBadge';
import { TransactionArchiveBadge } from './components/transaction-archive-badge/TransactionArchiveBadge';

export function getTransactionColumns(
  actions: RowActionConfig<TransactionListItem>[],
): ColumnDef<TransactionListItem>[] {
  return [
    {
      accessorKey: 'occurred_on',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const val = row.getValue<string>('occurred_on');
        return (
          <span className="font-medium">
            {val ? new Date(val).toLocaleDateString() : '—'}
          </span>
        );
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        const desc = row.getValue<string | null>('description');
        return (
          <div
            className="max-w-[200px] truncate text-sm font-medium"
            title={desc || ''}
          >
            {desc || '—'}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => (
        <TransactionTypeBadge type={row.getValue<TransactionType>('type')} />
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue<number>('amount');
        const type = row.original.type;
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);

        return (
          <span
            className={
              type === 'credit'
                ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                : 'font-semibold text-rose-600 dark:text-rose-400'
            }
          >
            {type === 'credit' ? `+${formatted}` : `-${formatted}`}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'account_name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account" />
      ),
      cell: ({ row }) => {
        const val = row.original.account_name;
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'category_name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const val = row.original.category_name;
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'party_name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Party" />
      ),
      cell: ({ row }) => {
        const val = row.original.party_name;
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'is_archived',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Archive" />
      ),
      cell: ({ row }) => (
        <TransactionArchiveBadge isArchived={row.getValue('is_archived')} />
      ),
      enableSorting: true,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DataTableRowActions row={row} actions={actions} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
