import type { IconSvgElement } from '@hugeicons/react';
import type { Row } from '@tanstack/react-table';
import type React from 'react';

// ─── Existing Types ─────────────────────────────────────────────────────────

export interface DataTableFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableFilterableColumn<TData> {
  id: Extract<keyof TData, string> | string;
  title: string;
  options: DataTableFilterOption[];
}

/**
 * A selectable target field for a date-range filter.
 */
export interface DataTableDateFieldOption {
  label: string;
  value: string;
  allowFuture?: boolean;
}

export interface DataTableDateRangeColumn<TData> {
  id: Extract<keyof TData, string> | string;
  title: string;
  fields?: DataTableDateFieldOption[];
}

export interface DataTableAsyncFilterPage {
  options: DataTableFilterOption[];
  total: number;
  hasMore: boolean;
}

export interface DataTableAsyncFilterSearchArgs {
  search?: string;
  page: number;
  limit: number;
}

export interface DataTableAsyncFilterableColumn {
  id: string;
  title: string;
  fetchOptions?: () => Promise<DataTableFilterOption[]>;
  fetchSearchOptions?: (
    args: DataTableAsyncFilterSearchArgs,
  ) => Promise<DataTableAsyncFilterPage>;
  pageSize?: number;
  searchPlaceholder?: string;
}

export interface DataTableSearchableColumn<TData> {
  id: Extract<keyof TData, string> | string;
  title: string;
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
}

export interface BulkActionConfig<T> {
  id: string;
  label: string | ((rows: T[]) => string);
  icon?: IconSvgElement;
  variant?: 'default' | 'destructive';
  separatorBefore?: boolean;
  onClick: (rows: T[]) => void;
}

export interface RowActionConfig<T> {
  id: string;
  label: string | ((row: T) => string);
  icon?: IconSvgElement | ((row: T) => IconSvgElement);
  variant?: 'default' | 'destructive';
  visible?: (row: T) => boolean;
  separatorBefore?: boolean;
  onClick: (row: T) => void;
}

// ─── Server Mode Types ───────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export interface PaginatedResponse<TData> {
  items: TData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ServerTableParams {
  page: number;
  limit: number;
  q?: string;
  sort_by?: string;
  sort_dir?: SortDirection;
  start_date?: string;
  end_date?: string;
  filters?: Record<string, string[]>;
}
