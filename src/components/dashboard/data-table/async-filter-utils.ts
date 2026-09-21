import type {
  DataTableAsyncFilterableColumn,
  DataTableAsyncFilterPage,
} from './types';

/**
 * Normalises a `DataTableAsyncFilterableColumn` into the single paginated
 * `fetchPage` signature the popover expects. When `fetchSearchOptions` is set
 * it is used directly (server-driven search + pagination). Otherwise the legacy
 * `fetchOptions` (one-shot full load) is wrapped to emulate search + paging
 * over the already-fetched list, preserving backward compatibility.
 */
export function resolveAsyncFetchPage(
  column: DataTableAsyncFilterableColumn,
): (args: {
  search?: string;
  page: number;
  limit: number;
}) => Promise<DataTableAsyncFilterPage> {
  if (column.fetchSearchOptions) {
    return args => column.fetchSearchOptions!(args);
  }

  const legacy = column.fetchOptions;
  return async ({ search, page, limit }) => {
    const all = legacy ? await legacy() : [];
    const needle = search?.trim().toLowerCase();
    const filtered = needle
      ? all.filter(o => o.label.toLowerCase().includes(needle))
      : all;
    const start = (page - 1) * limit;
    const slice = filtered.slice(start, start + limit);
    return {
      options: slice,
      total: filtered.length,
      hasMore: start + limit < filtered.length,
    };
  };
}
