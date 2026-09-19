import * as React from 'react';
import { useSearchParams } from 'react-router';

import type {
  ServerTableParams,
  SortDirection,
} from '@/components/dashboard/data-table/types';

// ─── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Serialise a `ServerTableParams` object into a `URLSearchParams` instance.
 *
 * Rules:
 *  - `page`       is omitted when it equals DEFAULT_PAGE (keeps URLs clean)
 *  - `limit`      is omitted when it equals DEFAULT_LIMIT
 *  - Empty string values are treated as absent
 *  - `filters`    keys are written as individual params using their own key
 *                 (e.g. `filters.status = ["NEW","CLOSED"]` → `&status=NEW,CLOSED`)
 *  - `start_date` / `end_date` are written as first-class params
 */
function serialiseParams(params: ServerTableParams): URLSearchParams {
  const qs = new URLSearchParams();

  if (params.page !== DEFAULT_PAGE) {
    qs.set('page', String(params.page));
  }

  if (params.limit !== DEFAULT_LIMIT) {
    qs.set('limit', String(params.limit));
  }

  if (params.q && params.q.trim() !== '') {
    qs.set('q', params.q.trim());
  }

  if (params.sort_by) {
    qs.set('sort_by', params.sort_by);
    // Only write sort_dir when sort_by is present — they travel together
    if (params.sort_dir) {
      qs.set('sort_dir', params.sort_dir);
    }
  }

  if (params.start_date) {
    qs.set('start_date', params.start_date);
  }

  if (params.end_date) {
    qs.set('end_date', params.end_date);
  }

  if (params.filters) {
    for (const [key, values] of Object.entries(params.filters) as [
      string,
      string[],
    ][]) {
      if (values.length > 0) {
        qs.set(key, values.join(','));
      }
    }
  }

  return qs;
}

/**
 * Known first-class param keys that are NOT treated as arbitrary filters when
 * parsing the URL. Anything outside this list that isn't a reserved Next.js
 * param will be collected into `filters`.
 */
const RESERVED_KEYS = new Set([
  'page',
  'limit',
  'q',
  'sort_by',
  'sort_dir',
  'start_date',
  'end_date',
]);

/**
 * Parse a `URLSearchParams` (from `useSearchParams()`) back into a
 * fully-typed `ServerTableParams`, merging with caller-supplied defaults.
 */
function parseParams(
  searchParams: URLSearchParams,
  defaults: Partial<ServerTableParams>,
  preserveKeys: string[] = [],
): ServerTableParams {
  const filters: Record<string, string[]> = {};

  searchParams.forEach((value, key) => {
    if (!RESERVED_KEYS.has(key) && !preserveKeys.includes(key)) {
      filters[key] = value.split(',').filter(Boolean);
    }
  });

  const rawPage = searchParams.get('page');
  const rawLimit = searchParams.get('limit');
  const rawSortDir = searchParams.get('sort_dir') as SortDirection | null;

  return {
    page: rawPage
      ? Math.max(1, Number(rawPage))
      : (defaults.page ?? DEFAULT_PAGE),
    limit: rawLimit
      ? Math.max(1, Number(rawLimit))
      : (defaults.limit ?? DEFAULT_LIMIT),
    q: searchParams.get('q') ?? defaults.q ?? undefined,
    sort_by: searchParams.get('sort_by') ?? defaults.sort_by ?? undefined,
    sort_dir:
      rawSortDir === 'asc' || rawSortDir === 'desc'
        ? rawSortDir
        : (defaults.sort_dir ?? undefined),
    start_date:
      searchParams.get('start_date') ?? defaults.start_date ?? undefined,
    end_date: searchParams.get('end_date') ?? defaults.end_date ?? undefined,
    filters:
      Object.keys(filters).length > 0
        ? filters
        : (defaults.filters ?? undefined),
  };
}

// ─── Debounce ──────────────────────────────────────────────────────────────────

/**
 * Returns a stable debounced wrapper around `fn`.
 * Uses a plain `useRef` + `setTimeout` — no extra package needed.
 */
function useDebouncedCallback<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number,
): T {
  const fnRef = React.useRef(fn);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Always call the latest version of fn without resetting the debounce timer
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
        timerRef.current = null;
      }, delay);
    },
    [delay],
  ) as T;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export interface UseServerTableParamsReturn {
  /** Current fully-parsed table params (driven by URL). */
  params: ServerTableParams;

  /**
   * Merge a partial update into the current params and push the new URL.
   * Resets `page` to 1 automatically unless `page` is explicitly included in
   * the update (avoids showing page 5 after changing a filter).
   */
  setParams: (next: Partial<ServerTableParams>, resetPage?: boolean) => void;

  /**
   * Convenience: debounced (400 ms) search setter.
   * Automatically resets page to 1 and clears the value when empty.
   *
   * Pass this directly to the `<Input onChange>` handler or the
   * `onSearchChange` prop of `<DataTable mode="server">`.
   */
  setSearch: (value: string) => void;

  /** Convenience: update page number only. */
  setPage: (page: number) => void;

  /** Convenience: update limit and reset to page 1. */
  setLimit: (limit: number) => void;

  /**
   * Convenience: set sort column + direction together.
   * Pass `undefined` for both to clear sorting.
   */
  setSort: (
    sortBy: string | undefined,
    sortDir: SortDirection | undefined,
  ) => void;

  /**
   * Convenience: merge arbitrary filter values and reset to page 1.
   * Passing an empty array for a key removes it from the URL.
   */
  setFilters: (filters: Record<string, string[]>) => void;

  /** Convenience: set the date-range filter and reset to page 1. */
  setDateRange: (
    startDate: string | undefined,
    endDate: string | undefined,
  ) => void;

  /** Convenience: reset every param back to defaults. */
  reset: () => void;
}

/**
 * `useServerTableParams`
 *
 * Synchronises `ServerTableParams` with the React Router URL search
 * params.  All table state (page, limit, search query, sort, filters, dates)
 * lives in the URL so that:
 *
 *  - The browser back/forward buttons work correctly.
 *  - Deep-linking and sharing URLs preserves table state.
 *
 * @param defaults  Optional baseline values used when a param is absent from
 *                  the URL.  Only non-default values are written to the URL, so
 *                  the URL stays clean.
 *
 * @example
 * ```ts
 * const { params, setSearch, setPage, setFilters } = useServerTableParams({
 *   limit: 20,
 * });
 * ```
 */
export function useServerTableParams(
  defaults: Partial<ServerTableParams> = {},
  preserveKeys: string[] = [],
): UseServerTableParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // Stable primitive key so an inline `preserveKeys` literal doesn't thrash memos.
  const preserveKey = preserveKeys.join(',');

  // ── Derived state ────────────────────────────────────────────────────────────

  // Re-parse on every searchParams change so the hook is always in sync with
  // the URL (e.g. user hits back / forward in the browser).
  const params = React.useMemo(
    () => parseParams(searchParams, defaults, preserveKey.split(',')),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, preserveKey],
    // `defaults` is intentionally excluded: callers should pass a stable
    // reference (object literal at module scope, or useMemo). Including it
    // would cause re-parses on every render when the caller writes an inline
    // object literal.
  );

  // ── Internal navigation helper ───────────────────────────────────────────────

  const navigate = React.useCallback(
    (next: ServerTableParams) => {
      const qs = serialiseParams(next);
      // Carry over non-table params (e.g. the active `tab`) so table
      // interactions and "reset" never wipe surrounding page state.
      for (const key of preserveKey.split(',')) {
        const value = key && searchParams.get(key);
        if (value) qs.set(key, value);
      }
      setSearchParams(qs, { replace: true });
    },
    [setSearchParams, searchParams, preserveKey],
  );

  // ── Public setters ───────────────────────────────────────────────────────────

  const setParams = React.useCallback(
    (next: Partial<ServerTableParams>, resetPage = true) => {
      const merged: ServerTableParams = {
        ...params,
        ...next,
        // Reset to page 1 unless the caller explicitly passes a page value
        page:
          next.page !== undefined
            ? next.page
            : resetPage
              ? DEFAULT_PAGE
              : params.page,
      };
      navigate(merged);
    },
    [params, navigate],
  );

  // Debounced search — fires 400 ms after the user stops typing.
  // The value is trimmed; an empty string clears the `q` param.
  const setSearch = useDebouncedCallback(
    React.useCallback(
      (value: string) => {
        setParams({ q: value.trim() || undefined }, true);
      },
      [setParams],
    ),
    400,
  );

  const setPage = React.useCallback(
    (page: number) => {
      navigate({ ...params, page: Math.max(1, page) });
    },
    [params, navigate],
  );

  const setLimit = React.useCallback(
    (limit: number) => {
      navigate({ ...params, limit: Math.max(1, limit), page: DEFAULT_PAGE });
    },
    [params, navigate],
  );

  const setSort = React.useCallback(
    (sortBy: string | undefined, sortDir: SortDirection | undefined) => {
      navigate({
        ...params,
        sort_by: sortBy,
        sort_dir: sortDir,
        page: DEFAULT_PAGE,
      });
    },
    [params, navigate],
  );

  const setFilters = React.useCallback(
    (filters: Record<string, string[]>) => {
      const hasExistingFilters =
        params.filters && Object.keys(params.filters).length > 0;
      const isExplicitClear =
        Object.keys(filters).length === 0 && hasExistingFilters;

      if (isExplicitClear) {
        navigate({
          ...params,
          filters: undefined,
          page: DEFAULT_PAGE,
        });
        return;
      }

      const merged: Record<string, string[]> = {
        ...(params.filters ?? {}),
        ...filters,
      };
      for (const key of Object.keys(merged)) {
        if (merged[key].length === 0) delete merged[key];
      }
      navigate({
        ...params,
        filters: Object.keys(merged).length > 0 ? merged : undefined,
        page: DEFAULT_PAGE,
      });
    },
    [params, navigate],
  );

  const setDateRange = React.useCallback(
    (startDate: string | undefined, endDate: string | undefined) => {
      navigate({
        ...params,
        start_date: startDate,
        end_date: endDate,
        page: DEFAULT_PAGE,
      });
    },
    [params, navigate],
  );

  const reset = React.useCallback(() => {
    navigate({
      q: undefined,
      sort_by: undefined,
      sort_dir: undefined,
      start_date: undefined,
      end_date: undefined,
      filters: undefined,
      page: defaults.page ?? DEFAULT_PAGE,
      limit: defaults.limit ?? DEFAULT_LIMIT,
    });
  }, [defaults, navigate]);

  return {
    params,
    setParams,
    setSearch,
    setPage,
    setLimit,
    setSort,
    setFilters,
    setDateRange,
    reset,
  };
}
