import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { ProjectListItem } from '@/types/api/project.d';
import { ProjectStatusBadge } from './components/project-status-badge/ProjectStatusBadge';
import { ProjectArchiveBadge } from './components/project-archive-badge/ProjectArchiveBadge';

export function getProjectColumns(
  actions: RowActionConfig<ProjectListItem>[],
): ColumnDef<ProjectListItem>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Project Name" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <ProjectStatusBadge status={row.getValue('status')} />,
      enableSorting: true,
    },
    {
      accessorKey: 'start_date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      cell: ({ row }) => {
        const val = row.getValue<string | null>('start_date');
        return (
          <span className="text-muted-foreground text-sm">{val || '—'}</span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: 'end_date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      cell: ({ row }) => {
        const val = row.getValue<string | null>('end_date');
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
        <ProjectArchiveBadge isArchived={row.getValue('is_archived')} />
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
