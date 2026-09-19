import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';
import type { Row } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';

import { Button } from '@/components/ui/button/Button';

import type { RowActionConfig } from './types';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: RowActionConfig<TData>[];
}

export function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
          <span className="sr-only">Open row menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        {actions.map(action => {
          if (!(action.visible?.(row.original) ?? true)) return null;

          return (
            <div key={action.id}>
              {action.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                onSelect={() => action.onClick(row.original)}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  action.onClick(row.original);
                }}
                variant={action.variant}
                className="w-full"
              >
                {action.icon &&
                  (action.icon instanceof Function ? (
                    <HugeiconsIcon
                      icon={action.icon(row.original)}
                      className="size-4"
                    />
                  ) : (
                    <HugeiconsIcon icon={action.icon} className="size-4" />
                  ))}
                {action.label instanceof Function
                  ? action.label(row.original)
                  : action.label}
              </DropdownMenuItem>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
