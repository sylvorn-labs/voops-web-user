import type { ColumnDef } from '@tanstack/react-table';
import { Mail01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { MemberListItem } from '@/types/api/member.d';
import { MemberRoleBadge } from './components/member-role-badge/MemberRoleBadge';

export function getMemberColumns(
  actions: RowActionConfig<MemberListItem>[],
): ColumnDef<MemberListItem>[] {
  return [
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Member Email" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-medium">
          <HugeiconsIcon
            icon={Mail01Icon}
            className="text-muted-foreground size-4 shrink-0"
          />
          <span className="truncate">{row.original.email}</span>
        </div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <MemberRoleBadge role={row.getValue('role')} />,
      enableSorting: true,
    },
    {
      accessorKey: 'invited_by_email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invited By" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {row.original.invited_by_email || 'Workspace Owner'}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'joined_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined At" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue<string>('joined_at'));
        return (
          <span className="text-muted-foreground text-sm">
            {date.toLocaleDateString()}
          </span>
        );
      },
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
