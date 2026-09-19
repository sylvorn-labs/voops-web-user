import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import type { Table } from '@tanstack/react-table';
import type { DateRange } from 'react-day-picker';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';
import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip/Tooltip';

import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { cn } from '@/lib/utils';

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
  DataTableDateRangeColumn,
  DataTableAsyncFilterableColumn,
  BulkActionConfig,
} from './types';

import { DataTableBulkActions } from './DataTableBulkActions';
import { DataTableDateRangeFilter } from './DataTableDateRangeFilter';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTableAsyncFilter } from './DataTableAsyncFilter';
import { resolveAsyncFetchPage } from './async-filter-utils';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  dateRangeColumns?: DataTableDateRangeColumn<TData>[];
  asyncFilterableColumns?: DataTableAsyncFilterableColumn[];
  /** Bulk actions shown in a dropdown when one or more rows are selected. */
  bulkActions?: BulkActionConfig<TData>[];
  className?: string;

  onSearchChange?: (value: string) => void;
  currentSearch?: string;

  onFilterChange?: (filters: Record<string, string[]>) => void;
  currentFilters?: Record<string, string[]>;

  /** Currently selected date field id (only used with `fields` configs). */
  currentDateField?: string;
  onDateFieldChange?: (field: string) => void;
  onDateRangeChange?: (
    start: string | undefined,
    end: string | undefined,
  ) => void;
  currentStartDate?: string;
  currentEndDate?: string;

  onReset?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  dateRangeColumns = [],
  asyncFilterableColumns = [],
  bulkActions = [],
  className,
  onSearchChange,
  currentSearch,
  onFilterChange,
  currentFilters,
  currentDateField,
  onDateFieldChange,
  onDateRangeChange,
  currentStartDate,
  currentEndDate,
  onReset,
}: DataTableToolbarProps<TData>) {
  const isServerSearch = onSearchChange !== undefined;

  const [localSearch, setLocalSearch] = React.useState<string>(
    currentSearch ?? '',
  );

  const prevCurrentSearch = React.useRef(currentSearch);
  React.useEffect(() => {
    if (prevCurrentSearch.current !== currentSearch) {
      prevCurrentSearch.current = currentSearch;
      setLocalSearch(currentSearch ?? '');
    }
  }, [currentSearch]);

  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: currentStartDate ? new Date(currentStartDate) : undefined,
    to: currentEndDate ? new Date(currentEndDate) : undefined,
  });

  const prevCurrentStartDate = React.useRef(currentStartDate);
  const prevCurrentEndDate = React.useRef(currentEndDate);

  React.useEffect(() => {
    const nextFrom = currentStartDate ? new Date(currentStartDate) : undefined;
    if (prevCurrentStartDate.current !== currentStartDate) {
      prevCurrentStartDate.current = currentStartDate;
      setDateRange(prev => ({ ...prev, from: nextFrom }));
    }
  }, [currentStartDate]);

  React.useEffect(() => {
    const nextTo = currentEndDate ? new Date(currentEndDate) : undefined;
    if (prevCurrentEndDate.current !== currentEndDate) {
      prevCurrentEndDate.current = currentEndDate;
      setDateRange(prev => ({ ...prev, to: nextTo }));
    }
  }, [currentEndDate]);

  const hasColumnFilters = table.getState().columnFilters.length > 0;
  const hasGlobalFilter = isServerSearch
    ? !!(currentSearch && currentSearch.trim() !== '')
    : !!table.getState().globalFilter;

  const hasDateRange = !!currentStartDate || !!currentEndDate;

  const hasAsyncFilters = currentFilters
    ? Object.values(currentFilters).some(v => v.length > 0)
    : false;

  const isFiltered =
    hasColumnFilters || hasGlobalFilter || hasDateRange || hasAsyncFilters;

  const handleSearchChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (isServerSearch) {
        setLocalSearch(value);
        onSearchChange(value);
      } else {
        table.setGlobalFilter(value);
      }
    },
    [isServerSearch, onSearchChange, table],
  );

  const handleResetFilters = React.useCallback(() => {
    if (onReset) {
      onReset();
    } else {
      table.resetColumnFilters();

      if (isServerSearch) {
        setLocalSearch('');
        onSearchChange('');
      } else {
        table.setGlobalFilter('');
      }

      setDateRange({ from: undefined, to: undefined });
      onDateRangeChange?.(undefined, undefined);

      if (onFilterChange) {
        onFilterChange({});
      }
    }
  }, [
    onReset,
    isServerSearch,
    onSearchChange,
    onDateRangeChange,
    onFilterChange,
    table,
  ]);

  const handleDateRangeChange = React.useCallback(
    (range: DateRange) => {
      setDateRange(range);
      const start = range.from
        ? format(range.from, 'yyyy-MM-dd HH:mm:ss')
        : undefined;
      const end = range.to
        ? format(range.to, 'yyyy-MM-dd HH:mm:ss')
        : undefined;
      onDateRangeChange?.(start, end);
    },
    [onDateRangeChange],
  );

  const handleAsyncFilterChange = React.useCallback(
    (fieldId: string, values: Set<string>) => {
      const newFilters = { ...(currentFilters ?? {}) };
      if (values.size === 0) {
        delete newFilters[fieldId];
      } else {
        newFilters[fieldId] = Array.from(values);
      }
      onFilterChange?.(newFilters);
    },
    [currentFilters, onFilterChange],
  );

  const getAsyncFilterValues = (fieldId: string): Set<string> => {
    if (!currentFilters || !currentFilters[fieldId]) return new Set();
    return new Set(currentFilters[fieldId]);
  };

  const searchInputValue = isServerSearch
    ? localSearch
    : ((table.getState().globalFilter as string) ?? '');

  const searchPlaceholder =
    searchableColumns.length > 0
      ? `Search ${searchableColumns.map(col => col.title).join(', ')}…`
      : 'Search…';

  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {searchableColumns.length > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
                />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchInputValue}
                  onChange={handleSearchChange}
                  className="h-8 w-48 pl-8 lg:w-64"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>{searchPlaceholder}</TooltipContent>
          </Tooltip>
        )}

        {dateRangeColumns.length > 0 &&
          dateRangeColumns.map(dateRangeColumn => (
            <DataTableDateRangeFilter
              key={dateRangeColumn.id}
              title={dateRangeColumn.title}
              value={dateRange}
              onDateChange={handleDateRangeChange}
              fields={dateRangeColumn.fields}
              selectedField={currentDateField}
              onFieldChange={onDateFieldChange}
            />
          ))}

        {filterableColumns.length > 0 &&
          filterableColumns.map(filterableColumn => {
            const column = table.getColumn(filterableColumn.id);
            if (!column) return null;

            return (
              <DataTableFacetedFilter
                key={filterableColumn.id}
                column={column}
                title={filterableColumn.title}
                options={filterableColumn.options}
              />
            );
          })}

        {asyncFilterableColumns.length > 0 &&
          asyncFilterableColumns.map(asyncColumn => (
            <DataTableAsyncFilter
              key={asyncColumn.id}
              title={asyncColumn.title}
              pageSize={asyncColumn.pageSize}
              searchPlaceholder={asyncColumn.searchPlaceholder}
              fetchPage={resolveAsyncFetchPage(asyncColumn)}
              selectedValues={getAsyncFilterValues(asyncColumn.id)}
              onSelectionChange={values =>
                handleAsyncFilterChange(asyncColumn.id, values)
              }
            />
          ))}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="text-muted-foreground hover:text-foreground h-8 px-2.5"
          >
            Reset
            <HugeiconsIcon icon={Cancel01Icon} className="ml-1.5 size-3.5" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {bulkActions.length > 0 &&
          table.getSelectedRowModel().flatRows.length > 0 && (
            <DataTableBulkActions table={table} actions={bulkActions} />
          )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
