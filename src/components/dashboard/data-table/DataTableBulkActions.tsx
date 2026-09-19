import { GroupItemsIcon } from '@hugeicons/core-free-icons';
import type { Table } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';

import { Button } from '@/components/ui/button/Button';

import type { BulkActionConfig } from './types';

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>;
  actions: BulkActionConfig<TData>[];
}

export function DataTableBulkActions<TData>({
  table,
  actions,
}: DataTableBulkActionsProps<TData>) {
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map(row => row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <HugeiconsIcon icon={GroupItemsIcon} className="mr-1 size-4" />
          Bulk Actions ({selectedRows.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {actions.map(action => {
          return (
            <span key={action.id} className="w-fit">
              {action.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={() => action.onClick(selectedRows)}
                variant={action.variant}
                className="w-full"
              >
                {action.icon && (
                  <HugeiconsIcon icon={action.icon} className="size-4" />
                )}
                {action.label instanceof Function
                  ? action.label(selectedRows)
                  : action.label}
              </DropdownMenuItem>
            </span>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
