import type { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { CategoryListItem } from '@/types/api/category.d';

import { CategoryBadge } from './components/category-badge/CategoryBadge';

export function getCategoryColumns(
  rowActions: RowActionConfig<CategoryListItem>[],
): ColumnDef<CategoryListItem>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <span
              className="size-3 rounded-full border shadow-xs"
              style={{ backgroundColor: category.color || '#6366F1' }}
            />
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'kind',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => <CategoryBadge kind={row.original.kind} />,
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
