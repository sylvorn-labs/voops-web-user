import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as React from 'react';

import {
  type PaginatedResponse,
  type ServerTableParams,
  type SortDirection,
} from '@/components/dashboard/data-table/types';

import { useServerTableParams } from './use-server-table-params';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface UseServerTableOptions<TData> {
  /**
   * Base query key. The current `ServerTableParams` object is appended as the
   * last element so TanStack Query re-fetches whenever any param changes.
   *
   * @example ["inquiries"]
   */
  queryKey: string[];

  /**
   * Async function that receives the current params and returns the paginated
   * API response.  This should call your API class method and unwrap the
   * `ApiResponse<PaginatedResponse<TData>>` envelope, returning only the inner
   * `PaginatedResponse<TData>` (i.e. `response.data`).
   *
   * @example
   * async (params) => {
   *   const res = await contactsAPI.getInquiries({ page: params.page, ... });
   *   return res.data; // PaginatedResponse<Inquiry>
   * }
   */
  queryFn: (params: ServerTableParams) => Promise<PaginatedResponse<TData>>;

  /**
   * Default param values used when a param key is absent from the URL.
   * Only non-default values are written to the URL (keeps URLs clean).
   *
   * @default { page: 1, limit: 20 }
   */
  defaults?: Partial<ServerTableParams>;

  /**
   * URL search-param keys that are NOT table state and must survive every
   * table interaction (including "reset"). They are never parsed into
   * `filters` and are re-written on each navigation.
   *
   * @example ["tab"]
   */
  preserveKeys?: string[];

  /**
   * Extra TanStack Query options forwarded to `useQuery`.
   * `queryKey` and `queryFn` are managed internally and cannot be overridden.
   */
  queryOptions?: {
    staleTime?: number;
    gcTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchInterval?: number | false;
    retry?: number | boolean;
    enabled?: boolean;
  };
}

export interface UseServerTableReturn<TData> {
  // ── Data ──────────────────────────────────────────────────────────────────

  /** The current page of items to pass to `<DataTable data={...} />`. */
  data: TData[];

  /**
   * Total number of rows across all pages (from `response.total`).
   * Pass this to `<DataTable totalRows={...} />` so the pagination footer
   * can compute the correct page count.
   */
  totalRows: number;

  /**
   * Total number of pages (from `response.total_pages`).
   * Useful if you need to render custom pagination controls outside DataTable.
   */
  totalPages: number;

  // ── Query state ───────────────────────────────────────────────────────────

  /**
   * `true` on the very first fetch (no cached data yet).
   * Use to show a full skeleton loader.
   */
  isLoading: boolean;

  /**
   * `true` whenever a background re-fetch is in flight (page change, search,
   * sort, filter).  Use to show a subtle "refreshing" indicator while keeping
   * the previous page's data visible.
   */
  isFetching: boolean;

  /** `true` if the query has errored. */
  isError: boolean;

  /** The raw error object, if any. */
  error: Error | null;

  // ── Current params (read from URL) ────────────────────────────────────────

  /**
   * The fully-parsed current table params driven by the URL.
   * Pass the individual fields to the `current*` props of
   * `<DataTable mode="server" />`.
   */
  params: ServerTableParams;

  // ── Handlers (pass to DataTable's onXxxChange props) ──────────────────────

  /**
   * Debounced (400 ms) search handler.
   * Pass to `<DataTable onSearchChange={...} />`.
   * Automatically resets page to 1 and clears the param when empty.
   */
  onSearchChange: (value: string) => void;

  /**
   * Page-change handler.
   * Pass to `<DataTable onPageChange={...} />`.
   */
  onPageChange: (page: number) => void;

  /**
   * Page-size change handler.
   * Pass to `<DataTable onPageSizeChange={...} />`.
   * Automatically resets page to 1.
   */
  onPageSizeChange: (limit: number) => void;

  /**
   * Sort change handler.
   * Pass to `<DataTable onSortChange={...} />`.
   * Automatically resets page to 1.
   * Pass `undefined` for both arguments to clear sorting.
   */
  onSortChange: (
    sortBy: string | undefined,
    sortDir: SortDirection | undefined,
  ) => void;

  /**
   * Filter change handler.
   * Pass to `<DataTable onFilterChange={...} />`.
   * Automatically resets page to 1.
   * Pass an empty array for a key to remove that filter from the URL.
   */
  onFilterChange: (filters: Record<string, string[]>) => void;

  /**
   * Date-range change handler.
   * Useful for tables that support `start_date` / `end_date` API params.
   * Automatically resets page to 1.
   * Pass `undefined` for either argument to clear that bound.
   */
  onDateRangeChange: (
    startDate: string | undefined,
    endDate: string | undefined,
  ) => void;

  /**
   * Resets all params (page, limit, search, sort, filters, dates) back to
   * their defaults and navigates to the clean URL.
   */
  onReset: () => void;

  /** Imperative refetch method in case you need to trigger a re-fetch outside of the standard param changes (e.g. after a mutation that affects the table data). */
  refetch: () => void;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * `useServerTable`
 *
 * A composite hook that wires TanStack Query and the React Router URL
 * together for server-driven data tables. It is the single import you need
 * at the page / feature level — no boilerplate required.
 *
 * What it does:
 *  1. Reads all table state (page, limit, search, sort, filters, dates) from
 *     the URL via `useServerTableParams`.
 *  2. Passes that state as the TanStack Query key so the query automatically
 *     re-fetches whenever any param changes.
 *  3. Returns typed data + loading flags + all `onXxxChange` callbacks ready
 *     to spread onto `<DataTable mode="server" />`.
 *
 * URL shape produced:
 *   /dashboard/inquiries?page=2&limit=20&q=jenil&sort_by=created_at&sort_dir=desc&status=NEW,IN_PROGRESS
 *
 * API params forwarded:
 *   page, limit, q, sort_by, sort_dir, start_date, end_date + any extra filters
 *
 * @example
 * ```tsx
 * const table = useServerTable<Inquiry>({
 *   queryKey: ["inquiries"],
 *   queryFn: async (params) => {
 *     const res = await contactsAPI.getInquiries({
 *       page:       params.page,
 *       limit:      params.limit,
 *       q:          params.q,
 *       sort_by:    params.sort_by,
 *       sort_dir:   params.sort_dir,
 *       start_date: params.start_date,
 *       end_date:   params.end_date,
 *       status:     params.filters?.status?.[0] as InquiryStatus | undefined,
 *     });
 *     return res.data; // unwrap ApiResponse → PaginatedResponse<Inquiry>
 *   },
 *   defaults: { limit: 20 },
 * });
 *
 * return (
 *   <DataTable
 *     mode="server"
 *     columns={columns}
 *     data={table.data}
 *     totalRows={table.totalRows}
 *     isLoading={table.isLoading}
 *     isFetching={table.isFetching}
 *     onSearchChange={table.onSearchChange}
 *     onPageChange={table.onPageChange}
 *     onPageSizeChange={table.onPageSizeChange}
 *     onSortChange={table.onSortChange}
 *     onFilterChange={table.onFilterChange}
 *     currentPage={table.params.page}
 *     currentPageSize={table.params.limit}
 *     currentSearch={table.params.q}
 *     currentSortBy={table.params.sort_by}
 *     currentSortDir={table.params.sort_dir}
 *     currentFilters={table.params.filters}
 *   />
 * );
 * ```
 */
export function useServerTable<TData>({
  queryKey,
  queryFn,
  defaults,
  preserveKeys,
  queryOptions = {},
}: UseServerTableOptions<TData>): UseServerTableReturn<TData> {
  // ── URL state ─────────────────────────────────────────────────────────────

  const {
    params,
    setSearch,
    setPage,
    setLimit,
    setSort,
    setFilters,
    setDateRange,
    reset,
  } = useServerTableParams(defaults, preserveKeys);

  // ── TanStack Query ────────────────────────────────────────────────────────

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<PaginatedResponse<TData>, Error>({
    // Append the full params object so any change in page / search / sort /
    // filters / dates triggers an independent cache entry + re-fetch.
    queryKey: [...queryKey, params],
    queryFn: () => queryFn(params),

    // Keep the previous page's data visible while the next page loads.
    // This prevents the table from flashing a skeleton on every page turn.
    placeholderData: keepPreviousData,

    staleTime: queryOptions.staleTime ?? 30_000, // 30 s default
    gcTime: queryOptions.gcTime ?? 5 * 60 * 1000, // 5 min default
    refetchOnWindowFocus: queryOptions.refetchOnWindowFocus ?? false,
    refetchInterval: queryOptions.refetchInterval ?? false,
    retry: queryOptions.retry ?? 1,
    enabled: queryOptions.enabled ?? true,
  });

  // ── Stable handler refs ───────────────────────────────────────────────────
  // Wrap each setter in useCallback so that consumers can safely include them
  // in dependency arrays without triggering re-renders.

  const onSearchChange = React.useCallback(
    (value: string) => setSearch(value),
    [setSearch],
  );

  const onPageChange = React.useCallback(
    (page: number) => setPage(page),
    [setPage],
  );

  const onPageSizeChange = React.useCallback(
    (limit: number) => setLimit(limit),
    [setLimit],
  );

  const onSortChange = React.useCallback(
    (sortBy: string | undefined, sortDir: SortDirection | undefined) =>
      setSort(sortBy, sortDir),
    [setSort],
  );

  const onFilterChange = React.useCallback(
    (filters: Record<string, string[]>) => setFilters(filters),
    [setFilters],
  );

  const onDateRangeChange = React.useCallback(
    (startDate: string | undefined, endDate: string | undefined) =>
      setDateRange(startDate, endDate),
    [setDateRange],
  );

  const onReset = React.useCallback(() => reset(), [reset]);

  // ── Return ────────────────────────────────────────────────────────────────

  return {
    // Data
    data: response?.items ?? [],
    totalRows: response?.total ?? 0,
    totalPages: response?.totalPages ?? 0,

    // Query state
    isLoading,
    isFetching,
    isError,
    error: error ?? null,

    // Current URL-driven params
    params,

    // Handlers
    onSearchChange,
    onPageChange,
    onPageSizeChange,
    onSortChange,
    onFilterChange,
    onDateRangeChange,
    onReset,

    // Imperative refetch method
    refetch,
  };
}
