import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
} from '@hugeicons/core-free-icons';

import type { Table } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

// ─── Props ─────────────────────────────────────────────────────────────────────

interface DataTablePaginationBaseProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  className?: string;
}

interface DataTablePaginationClientProps<
  TData,
> extends DataTablePaginationBaseProps<TData> {
  /** Client mode (default) — pagination is handled entirely by TanStack Table. */
  mode?: 'client';
  totalRows?: never;
  onPageChange?: never;
  onPageSizeChange?: never;
}

interface DataTablePaginationServerProps<
  TData,
> extends DataTablePaginationBaseProps<TData> {
  /**
   * Server mode — page navigation and page-size changes fire URL-aware
   * callbacks instead of mutating TanStack Table's internal state directly.
   */
  mode: 'server';

  /**
   * Total row count across ALL pages from the API (`data.total`).
   * Used to display "N row(s) total" and to compute the correct page count
   * when TanStack Table is in manual pagination mode.
   */
  totalRows: number;

  /** Called when the user clicks a page-navigation button. 1-based. */
  onPageChange?: (page: number) => void;

  /** Called when the user changes the rows-per-page selector. */
  onPageSizeChange?: (limit: number) => void;
}

type DataTablePaginationProps<TData> =
  DataTablePaginationClientProps<TData> | DataTablePaginationServerProps<TData>;

// ─── Component ─────────────────────────────────────────────────────────────────

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  className,
  mode = 'client',
  totalRows,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const isServer = mode === 'server';

  // ── Derived values ───────────────────────────────────────────────────────────

  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length;

  /**
   * In server mode the "total" label shows the API-reported grand total across
   * all pages.  In client mode it shows the filtered row count in memory.
   */
  const displayTotal = isServer
    ? (totalRows ?? 0)
    : table.getFilteredRowModel().rows.length;

  const currentPage = table.getState().pagination.pageIndex + 1;

  /**
   * In server mode TanStack Table computes the page count from `rowCount`
   * (which we set to `totalRows` in DataTable).  In client mode it derives it
   * from the number of rows in memory.
   */
  const totalPages = Math.max(1, table.getPageCount());

  // ── Navigation helpers ───────────────────────────────────────────────────────

  /**
   * In server mode we call the URL-aware callback and also keep TanStack
   * Table's internal page index in sync so the UI reflects the change
   * immediately without waiting for the re-fetch.
   *
   * In client mode we delegate entirely to TanStack Table.
   */
  const goToPage = React.useCallback(
    (pageIndex: number) => {
      // pageIndex is 0-based internally; callbacks and display are 1-based
      const clamped = Math.max(0, Math.min(pageIndex, totalPages - 1));
      if (isServer) {
        onPageChange?.(clamped + 1);
      } else {
        table.setPageIndex(clamped);
      }
    },
    [isServer, onPageChange, table, totalPages],
  );

  const handleFirstPage = React.useCallback(() => goToPage(0), [goToPage]);

  const handlePreviousPage = React.useCallback(
    () => goToPage(table.getState().pagination.pageIndex - 1),
    [goToPage, table],
  );

  const handleNextPage = React.useCallback(
    () => goToPage(table.getState().pagination.pageIndex + 1),
    [goToPage, table],
  );

  const handleLastPage = React.useCallback(
    () => goToPage(totalPages - 1),
    [goToPage, totalPages],
  );

  const handlePageSizeChange = React.useCallback(
    (value: string) => {
      const size = Number(value);
      if (isServer) {
        onPageSizeChange?.(size);
      } else {
        table.setPageSize(size);
      }
    },
    [isServer, onPageSizeChange, table],
  );

  // ── Disabled states ──────────────────────────────────────────────────────────
  // In server mode we derive can-navigate from the current page / totalPages
  // rather than from TanStack Table's internal canPreviousPage / canNextPage,
  // which may be stale while `manualPagination` is true.

  const canPrev = isServer ? currentPage > 1 : table.getCanPreviousPage();
  const canNext = isServer ? currentPage < totalPages : table.getCanNextPage();

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        'flex flex-col items-start justify-between gap-4 px-2 sm:flex-row sm:items-center',
        className,
      )}
    >
      {/* ── Left: row count summary ─────────────────────────────────────────── */}
      <p className="text-muted-foreground shrink-0 text-sm">
        {selectedRowCount > 0 ? (
          <>
            <span className="text-foreground font-medium">
              {selectedRowCount}
            </span>
            {' of '}
            <span className="text-foreground font-medium">{displayTotal}</span>
            {' row(s) selected'}
          </>
        ) : (
          <>
            <span className="text-foreground font-medium">{displayTotal}</span>
            {' row(s) total'}
          </>
        )}
      </p>

      {/* ── Right: controls ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Rows-per-page selector */}
        <div className="flex items-center gap-2">
          <p className="shrink-0 text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => handlePageSizeChange(value ? value : '10')}
          >
            <SelectTrigger className="h-8 w-16">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current page / total pages label */}
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <span>Page</span>
          <span className="text-foreground">{currentPage}</span>
          <span className="text-muted-foreground">of</span>
          <span className="text-foreground">{totalPages}</span>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleFirstPage}
            disabled={!canPrev}
            aria-label="Go to first page"
          >
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={handlePreviousPage}
            disabled={!canPrev}
            aria-label="Go to previous page"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleNextPage}
            disabled={!canNext}
            aria-label="Go to next page"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleLastPage}
            disabled={!canNext}
            aria-label="Go to last page"
          >
            <HugeiconsIcon icon={ArrowRightDoubleIcon} className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
