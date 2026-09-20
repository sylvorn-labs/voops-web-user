import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { PartyListItem } from '@/types/api/party.d';
import { PartyKindBadge } from './components/party-kind-badge/PartyKindBadge';
import { PartyArchiveBadge } from './components/party-archive-badge/PartyArchiveBadge';

export function getPartyColumns(
  actions: RowActionConfig<PartyListItem>[],
): ColumnDef<PartyListItem>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Party Name" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'kind',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <PartyKindBadge kind={row.getValue('kind')} />,
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        const val = row.getValue<string | null>('email');
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        const val = row.getValue<string | null>('phone');
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'is_archived',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Archive" />
      ),
      cell: ({ row }) => (
        <PartyArchiveBadge isArchived={row.getValue('is_archived')} />
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>('created_at'));
        return (
          <span className="text-muted-foreground text-sm">
            {date.toLocaleDateString()}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>('updated_at'));
        return (
          <span className="text-muted-foreground text-sm">
            {date.toLocaleDateString()}
          </span>
        );
      },
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
