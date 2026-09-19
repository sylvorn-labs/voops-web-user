import { LayoutThreeColumnIcon } from '@hugeicons/core-free-icons';
import type { Table } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function DataTableViewOptions<TData>({
  table,
  className,
}: DataTableViewOptionsProps<TData>) {
  const columns = table
    .getAllColumns()
    .filter(
      column => typeof column.accessorFn !== 'undefined' && column.getCanHide(),
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="sm"
          className={cn('ml-auto hidden h-8 lg:flex', className)}
        >
          <HugeiconsIcon icon={LayoutThreeColumnIcon} className="mr-1 size-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map(column => {
          const label =
            typeof column.columnDef.header === 'string'
              ? column.columnDef.header
              : column.id
                  .replace(/_/g, ' ')
                  .replace(/([a-z])([A-Z])/g, '$1 $2')
                  .replace(/\b\w/g, c => c.toUpperCase());

          const handleCheckedChange = (value: boolean) =>
            column.toggleVisibility(!!value);

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={handleCheckedChange}
            >
              {label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
