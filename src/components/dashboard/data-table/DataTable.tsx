import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type Row,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

import { PlusSignIcon, RefreshIcon } from '@hugeicons/core-free-icons';
import * as React from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu/ContextMenu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/Table';

import { Empty } from '@/components/global/Empty';
import { Error } from '@/components/global/Error';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import { cn } from '@/lib/utils';

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableDateRangeColumn,
  DataTableAsyncFilterableColumn,
  BulkActionConfig,
  SortDirection,
} from './types';

import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';

// ─── Props ─────────────────────────────────────────────────────────────────────

export interface DataTableBaseProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  dateRangeColumns?: DataTableDateRangeColumn<TData>[];

  /**
   * Columns hidden on first render. Users can still toggle them back on via
   * the view-options menu.
   *
   * @example { assignedAt: false, actualCompletionDate: false }
   */
  defaultColumnVisibility?: VisibilityState;
  asyncFilterableColumns?: DataTableAsyncFilterableColumn[];
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  isLoading?: boolean;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  /**
   * Optional bulk actions shown in the toolbar dropdown when one or more rows
   * are selected. Each action receives the full selection as `TData[]`.
   */
  bulkActions?: BulkActionConfig<TData>[];
  className?: string;
  /**
   * Optional render prop for a right-click context menu on each data row.
   * Return `ContextMenuItem` / `ContextMenuSeparator` nodes — the DataTable
   * wraps them in `<ContextMenuContent>` automatically.
   * When omitted, rows render with no context menu (no behaviour change).
   */
  renderRowContextMenu?: (row: Row<TData>) => React.ReactNode;

  /**
   * Optional callback fired when a row is clicked (single left-click).
   * Receives the full row data object (`row.original`).
   * Rows show a pointer cursor on hover when this is set.
   *
   * Clicking the row checkbox does NOT fire this callback — the checkbox
   * event is stopped from propagating to the row handler.
   *
   * Useful for navigation (e.g. router.push) or opening detail sheets.
   */
  onRowClick?: (row: TData) => void;

  // ── Empty & Error states ───────────────────────────────────────────

  /** When `true`, the error state is rendered instead of the table body. */
  isError?: boolean;

  /** Title shown in the error state. Default: "Failed to load data" */
  errorTitle?: string;

  /** Description shown in the error state. */
  errorDescription?: string;

  /** When set, a "Try again" button is shown in the error state. */
  onErrorRetry?: () => void;

  /** Title shown when the table has no rows. Default: "No results found." */
  emptyTitle?: string;

  /** Optional description shown alongside the empty title. */
  emptyDescription?: string;

  /**
   * Label for the action button shown in the empty state.
   * Requires `onEmptyAction` to be set.
   */
  emptyActionLabel?: string;

  /** Called when the empty-state action button is clicked. */
  onEmptyAction?: () => void;
}

// ── Client mode (default) ──────────────────────────────────────────────────────

export interface DataTableClientProps<TData, TValue> extends DataTableBaseProps<
  TData,
  TValue
> {
  /**
   * `"client"` (default) — TanStack Table handles all filtering, sorting, and
   * pagination in-memory.  No additional props are required.
   */
  mode?: 'client';
  // Server-only props are not present in client mode
  totalRows?: never;
  isFetching?: never;
  onSearchChange?: never;
  onPageChange?: never;
  onPageSizeChange?: never;
  onSortChange?: never;
  onFilterChange?: never;
  onDateRangeChange?: never;
  onDateFieldChange?: never;
  currentDateField?: never;
  currentPage?: never;
  currentPageSize?: never;
  currentSearch?: never;
  currentSortBy?: never;
  currentSortDir?: never;
  currentFilters?: never;
  currentStartDate?: never;
  currentEndDate?: never;
  onReset?: never;
}

// ── Server mode ────────────────────────────────────────────────────────────────

export interface DataTableServerProps<TData, TValue> extends DataTableBaseProps<
  TData,
  TValue
> {
  /**
   * `"server"` — all filtering, sorting, and pagination is delegated to the
   * API.  TanStack Table is put into manual mode (`manualPagination`,
   * `manualSorting`, `manualFiltering`) and the component becomes fully
   * controlled via the `current*` props and `onXxxChange` callbacks.
   *
   * Wire this up with the `useServerTable` hook:
   *
   * ```tsx
   * const table = useServerTable<Inquiry>({ queryKey: ["inquiries"], queryFn });
   *
   * <DataTable
   *   mode="server"
   *   data={table.data}
   *   totalRows={table.totalRows}
   *   isLoading={table.isLoading}
   *   isFetching={table.isFetching}
   *   onSearchChange={table.onSearchChange}
   *   onPageChange={table.onPageChange}
   *   onPageSizeChange={table.onPageSizeChange}
   *   onSortChange={table.onSortChange}
   *   onFilterChange={table.onFilterChange}
   *   currentPage={table.params.page}
   *   currentPageSize={table.params.limit}
   *   currentSearch={table.params.q}
   *   currentSortBy={table.params.sort_by}
   *   currentSortDir={table.params.sort_dir}
   *   currentFilters={table.params.filters}
   * />
   * ```
   */
  mode: 'server';

  /**
   * Total row count across all pages from the API response (`data.total`).
   * Required in server mode so the pagination footer can compute the correct
   * page count without having all rows in memory.
   */
  totalRows: number;

  /**
   * `true` while a background re-fetch is in flight (e.g. page change, search
   * update, filter toggle).  Renders a semi-transparent overlay over the table
   * body so users can see something is happening without a full skeleton flash.
   */
  isFetching?: boolean;

  // ── Controlled state (from URL / useServerTable) ────────────────────────────

  /** Current 1-based page number — driven by the URL. */
  currentPage?: number;

  /** Current rows-per-page value — driven by the URL. */
  currentPageSize?: number;

  /** Current search query string — driven by the URL. */
  currentSearch?: string;

  /** Current sort column id — driven by the URL. */
  currentSortBy?: string;

  /** Current sort direction — driven by the URL. */
  currentSortDir?: SortDirection;

  /**
   * Current active filter values per column key — driven by the URL.
   * Shape: `{ status: ["NEW", "IN_PROGRESS"], ... }`
   */
  currentFilters?: Record<string, string[]>;

  /**
   * Current date range filter values — driven by the URL.
   */
  currentStartDate?: string;
  currentEndDate?: string;

  // ── Change callbacks (write back to URL / useServerTable) ───────────────────

  /**
   * Called with the new search string after the debounce period (400 ms).
   * An empty string signals that the search has been cleared.
   */
  onSearchChange?: (value: string) => void;

  /** Called when the user navigates to a different page. */
  onPageChange?: (page: number) => void;

  /** Called when the user changes the rows-per-page selector. */
  onPageSizeChange?: (limit: number) => void;

  /**
   * Called when the user clicks a sortable column header.
   * Both arguments are `undefined` when sorting is cleared.
   */
  onSortChange?: (
    sortBy: string | undefined,
    sortDir: SortDirection | undefined,
  ) => void;

  /**
   * Called when the user toggles a faceted filter option.
   * The full updated filter map is passed (not just the diff).
   * Pass an empty array for a key to signal that filter was cleared.
   */
  onFilterChange?: (filters: Record<string, string[]>) => void;

  /**
   * Called when the user selects a date range.
   * Both arguments are `undefined` when the date range is cleared.
   */
  onDateRangeChange?: (
    start: string | undefined,
    end: string | undefined,
  ) => void;

  /**
   * Currently selected date field, used when a `dateRangeColumns` entry
   * declares `fields`. Defaults to the first configured field.
   */
  currentDateField?: string;

  /** Called when the user picks a different date field for the range filter. */
  onDateFieldChange?: (field: string) => void;

  /** Called when the Reset button is clicked — clears all filters, search, sort, and date range. */
  onReset?: () => void;
}

export type DataTableProps<TData, TValue> =
  DataTableClientProps<TData, TValue> | DataTableServerProps<TData, TValue>;

// ─── Component ─────────────────────────────────────────────────────────────────

export function DataTable<TData, TValue>({
  columns,
  data,
  filterableColumns = [],
  searchableColumns = [],
  dateRangeColumns = [],
  asyncFilterableColumns = [],
  defaultColumnVisibility,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  isLoading = false,
  enableRowSelection = true,
  onRowSelectionChange,
  bulkActions,
  className,
  renderRowContextMenu,
  onRowClick,
  // Server / client discriminator
  mode = 'client',
  // Server-only props (safe to destructure — they are `never` in client mode)
  totalRows,
  isFetching = false,
  currentPage,
  currentPageSize,
  currentSearch,
  currentSortBy,
  currentSortDir,
  currentFilters,
  currentStartDate,
  currentEndDate,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  onFilterChange,
  onDateRangeChange,
  currentDateField,
  onDateFieldChange,
  onReset,
  // Empty & Error states
  isError = false,
  errorTitle,
  errorDescription,
  onErrorRetry,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
}: DataTableProps<TData, TValue>) {
  const isServer = mode === 'server';

  // ── Client-mode local state ──────────────────────────────────────────────────
  // In server mode these are still declared (React hook rules) but they are
  // overridden / ignored in favour of the controlled props below.

  const [clientSorting, setClientSorting] = React.useState<SortingState>([]);
  const [clientColumnFilters, setClientColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [clientGlobalFilter, setClientGlobalFilter] =
    React.useState<string>('');
  const [clientPagination, setClientPagination] = React.useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // ── Server-mode derived state ────────────────────────────────────────────────
  // Translate the URL-driven controlled props into the shapes TanStack Table
  // expects, so the table header/footer UI stays in sync with the URL.

  const serverSorting: SortingState = React.useMemo(() => {
    if (!isServer || !currentSortBy) return [];
    return [{ id: currentSortBy, desc: currentSortDir === 'desc' }];
  }, [isServer, currentSortBy, currentSortDir]);

  const serverColumnFilters: ColumnFiltersState = React.useMemo(() => {
    if (!isServer || !currentFilters) return [];
    return Object.entries(currentFilters)
      .filter(([, values]) => values.length > 0)
      .map(([id, value]) => ({ id, value }));
  }, [isServer, currentFilters]);

  const serverPagination = React.useMemo(
    () => ({
      pageIndex: isServer ? Math.max(0, (currentPage ?? 1) - 1) : 0,
      pageSize: isServer
        ? (currentPageSize ?? defaultPageSize)
        : defaultPageSize,
    }),
    [isServer, currentPage, currentPageSize, defaultPageSize],
  );

  // ── Row selection (shared between both modes) ────────────────────────────────

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(defaultColumnVisibility ?? {});

  // ── Column pinning (shared between both modes) ───────────────────────────────
  // Automatically pin a column with `id: "actions"` to the right edge so the
  // row-actions menu stays visible when the table scrolls horizontally.

  const hasActionsColumn = React.useMemo(
    () => columns.some(col => col.id === 'actions'),
    [columns],
  );

  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    () =>
      hasActionsColumn
        ? { left: [], right: ['actions'] }
        : { left: [], right: [] },
  );

  // ── Selection column definition ──────────────────────────────────────────────

  const selectionColumn: ColumnDef<TData, TValue> = {
    id: 'select',
    header: ({ table }) => (
      <div onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };

  const tableColumns = enableRowSelection
    ? [selectionColumn, ...columns]
    : columns;

  // ── TanStack Table instance ──────────────────────────────────────────────────

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,

    // ── Manual mode flags (server only) ───────────────────────────────────────
    manualPagination: isServer,
    manualSorting: isServer,
    manualFiltering: isServer,

    // Enable column pinning so the actions column can stick to the right edge.
    enableColumnPinning: true,

    // In server mode, pass the total row count from the API so TanStack Table
    // can compute the correct page count (it no longer has all rows in memory).
    rowCount: isServer ? totalRows : undefined,

    // ── State ─────────────────────────────────────────────────────────────────
    state: {
      sorting: isServer ? serverSorting : clientSorting,
      columnFilters: isServer ? serverColumnFilters : clientColumnFilters,
      columnVisibility,
      rowSelection,
      columnPinning,
      globalFilter: isServer ? (currentSearch ?? '') : clientGlobalFilter,
      pagination: isServer ? serverPagination : clientPagination,
    },

    // ── Handlers ──────────────────────────────────────────────────────────────
    onColumnPinningChange: setColumnPinning,
    onSortingChange: isServer
      ? updater => {
          // updater can be a value or a function — resolve it against current state
          const next =
            typeof updater === 'function' ? updater(serverSorting) : updater;
          if (next.length === 0) {
            onSortChange?.(undefined, undefined);
          } else {
            onSortChange?.(next[0].id, next[0].desc ? 'desc' : 'asc');
          }
        }
      : setClientSorting,

    onColumnFiltersChange: isServer
      ? updater => {
          const next =
            typeof updater === 'function'
              ? updater(serverColumnFilters)
              : updater;
          const mapped: Record<string, string[]> = {};
          for (const f of next) {
            mapped[f.id] = Array.isArray(f.value)
              ? (f.value as string[])
              : [String(f.value)];
          }
          // Include cleared columns (keys present in current filters but absent
          // in next) so the handler can remove them from the URL.
          if (currentFilters) {
            for (const key of Object.keys(currentFilters)) {
              if (!(key in mapped)) mapped[key] = [];
            }
          }
          onFilterChange?.(mapped);
        }
      : setClientColumnFilters,

    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    onGlobalFilterChange: isServer
      ? (value: string) => onSearchChange?.(value)
      : setClientGlobalFilter,

    onPaginationChange: isServer
      ? updater => {
          const next =
            typeof updater === 'function' ? updater(serverPagination) : updater;
          // Only fire the appropriate callback depending on what changed
          if (next.pageSize !== serverPagination.pageSize) {
            onPageSizeChange?.(next.pageSize);
          } else {
            // pageIndex is 0-based internally; API is 1-based
            onPageChange?.(next.pageIndex + 1);
          }
        }
      : setClientPagination,

    // ── Row models ────────────────────────────────────────────────────────────
    getCoreRowModel: getCoreRowModel(),
    // In server mode these still need to be provided so sub-components
    // (e.g. DataTableFacetedFilter) that call getFacetedUniqueValues() don't
    // crash, but they operate on the current page slice only.
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    globalFilterFn: 'auto',

    enableRowSelection,

    // In server mode keep the initial pagination in sync with the URL defaults
    // so the first render doesn't show a stale page size.
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
  });

  // ── Row selection side-effect ────────────────────────────────────────────────

  React.useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map(row => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  // ── Render ───────────────────────────────────────────────────────────────────

  const visibleColumnCount = table.getVisibleLeafColumns().length;

  // Skeleton row count: in server mode use the current page size so the
  // skeleton exactly matches the expected content height.
  const skeletonRowCount = isServer
    ? (currentPageSize ?? defaultPageSize)
    : defaultPageSize;

  // Sticky styles for a pinned column (header + cell). The actions column is
  // pinned to the right so it stays visible when the table scrolls sideways.
  const getPinnedProps = (column: Column<TData>) => {
    const isPinned = column.getIsPinned();

    if (!isPinned) {
      return { className: '', style: {} };
    }

    return {
      className: cn(
        'sticky z-20 bg-transparent',
        isPinned === 'left' &&
          'shadow-[inset_-2px_0_3px_-3px_rgba(0,0,0,0.25)]',
        isPinned === 'right' &&
          'shadow-[inset_2px_0_3px_-3px_rgba(0,0,0,0.25)]',
      ),
      style: {
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right:
          isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      },
    };
  };

  return (
    <div className={cn('flex h-full flex-col gap-4', className)}>
      <DataTableToolbar
        table={table}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        dateRangeColumns={dateRangeColumns}
        asyncFilterableColumns={asyncFilterableColumns}
        bulkActions={bulkActions}
        onDateRangeChange={isServer ? onDateRangeChange : undefined}
        currentDateField={isServer ? currentDateField : undefined}
        onDateFieldChange={isServer ? onDateFieldChange : undefined}
        currentStartDate={isServer ? currentStartDate : undefined}
        currentEndDate={isServer ? currentEndDate : undefined}
        onFilterChange={isServer ? onFilterChange : undefined}
        currentFilters={isServer ? currentFilters : undefined}
        onReset={isServer ? onReset : undefined}
        // In server mode pass the debounced search handler directly so the
        // toolbar input fires it instead of calling table.setGlobalFilter.
        onSearchChange={isServer ? onSearchChange : undefined}
        currentSearch={isServer ? currentSearch : undefined}
      />

      {/* Relative wrapper so the isFetching overlay is scoped to the table */}
      <div className="relative h-full overflow-hidden rounded-2xl border">
        {/* Fetching overlay — visible during background re-fetches in server mode */}
        {isServer && isFetching && !isLoading && (
          <div
            className="bg-background/50 pointer-events-none absolute inset-0 z-10 backdrop-blur-[1px]"
            aria-hidden="true"
          />
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const pinnedProps = getPinnedProps(header.column);
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={pinnedProps.className}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                        ...pinnedProps.style,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="h-full">
            {isError ? (
              <TableRow className="h-full">
                <TableCell colSpan={visibleColumnCount} className="h-full">
                  <Error
                    title={errorTitle ?? 'Failed to load data'}
                    description={
                      errorDescription ??
                      'Something went wrong. Please try again.'
                    }
                    primaryAction={
                      onErrorRetry
                        ? {
                            label: 'Try again',
                            icon: RefreshIcon,
                            onClick: onErrorRetry,
                          }
                        : undefined
                    }
                  />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              // Full skeleton on initial load (no data in cache yet)
              Array.from({ length: skeletonRowCount }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array.from({ length: visibleColumnCount }).map(
                    (_, cellIndex) => (
                      <TableCell key={`skeleton-cell-${cellIndex}`}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => {
                const rowNode = (
                  <TableRow
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className={cn(
                      row.getIsSelected() && 'bg-muted/50',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map(cell => {
                      const pinnedProps = getPinnedProps(cell.column);
                      return (
                        <TableCell
                          key={cell.id}
                          className={pinnedProps.className}
                          style={pinnedProps.style}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );

                if (!renderRowContextMenu) {
                  return (
                    <React.Fragment key={row.id}>{rowNode}</React.Fragment>
                  );
                }

                return (
                  <ContextMenu key={row.id}>
                    <ContextMenuTrigger asChild>{rowNode}</ContextMenuTrigger>
                    <ContextMenuContent>
                      {renderRowContextMenu(row)}
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })
            ) : (
              <TableRow className="h-full">
                <TableCell colSpan={visibleColumnCount} className="h-full">
                  <Empty
                    title={emptyTitle ?? 'No results found.'}
                    description={
                      emptyDescription ??
                      "Try adjusting your search or filter to find what you're looking for."
                    }
                    primaryAction={
                      emptyActionLabel && onEmptyAction
                        ? {
                            label: emptyActionLabel,
                            icon: PlusSignIcon,
                            onClick: onEmptyAction,
                          }
                        : undefined
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isServer ? (
        <DataTablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          mode="server"
          totalRows={totalRows ?? 0}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      ) : (
        <DataTablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
          mode="client"
        />
      )}
    </div>
  );
}
