import type { Row } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu/ContextMenu';

import type { RowActionConfig } from './types';

interface DataTableRowContextMenuContentProps<TData> {
  row: Row<TData>;
  actions: RowActionConfig<TData>[];
}

export function DataTableRowContextMenuContent<TData>({
  row,
  actions,
}: DataTableRowContextMenuContentProps<TData>) {
  return (
    <>
      {actions.map(action => {
        if (!(action.visible?.(row.original) ?? true)) return null;

        return (
          <div key={action.id}>
            {action.separatorBefore && <ContextMenuSeparator />}
            <ContextMenuItem
              onSelect={() => action.onClick(row.original)}
              variant={action.variant}
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
            </ContextMenuItem>
          </div>
        );
      })}
    </>
  );
}
