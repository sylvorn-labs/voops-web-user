import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { AccountListItem } from '@/types/api/account.d';

import { AccountKindBadge } from './components/account-kind-badge/AccountKindBadge';
import { AccountStatusBadge } from './components/account-status-badge/AccountStatusBadge';

export function getAccountColumns(
  rowActions: RowActionConfig<AccountListItem>[],
): ColumnDef<AccountListItem>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Name" />
      ),
      cell: ({ row }) => {
        const account = row.original;
        return (
          <div className="flex flex-col">
            <span className="text-foreground font-medium">{account.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'kind',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <AccountKindBadge kind={row.original.kind} />,
    },
    {
      accessorKey: 'opening_balance',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Opening Balance" />
      ),
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(Number(row.original.opening_balance));

        return <span className="text-foreground font-medium">{formatted}</span>;
      },
    },
    {
      accessorKey: 'is_archived',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <AccountStatusBadge isArchived={row.original.is_archived} />
      ),
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <span className="text-muted-foreground text-xs">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        );
      },
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.updated_at);
        return (
          <span className="text-muted-foreground text-xs">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
    },
  ];
}
