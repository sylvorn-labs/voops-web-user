import * as React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { FilterIcon, Cancel01Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { Separator } from '@/components/ui/separator/Separator';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Spinner } from '@/components/ui/spinner/Spinner';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/Popover';

import type { DataTableFilterOption, DataTableAsyncFilterPage } from './types';

interface DataTableAsyncFilterProps {
  title: string;
  pageSize?: number;
  searchPlaceholder?: string;
  /**
   * Unified resolver that fetches a single page of options. Higher layers
   * normalise both the legacy `fetchOptions` and the new `fetchSearchOptions`
   * into this signature so this component only deals with paginated results.
   */
  fetchPage: (args: {
    search?: string;
    page: number;
    limit: number;
  }) => Promise<DataTableAsyncFilterPage>;
  selectedValues: Set<string>;
  onSelectionChange: (values: Set<string>) => void;
}

interface CachedSearch {
  options: DataTableFilterOption[];
  total: number;
  hasMore: boolean;
  /** Next page to fetch for this search key (1-based). */
  nextPage: number;
}

export function DataTableAsyncFilter({
  title,
  pageSize = 20,
  searchPlaceholder,
  fetchPage,
  selectedValues,
  onSelectionChange,
}: DataTableAsyncFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [options, setOptions] = React.useState<DataTableFilterOption[]>([]);
  const [hasMore, setHasMore] = React.useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = React.useState(false);
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fetchKey, setFetchKey] = React.useState(0);

  // Per-search cache holding accumulated pages.
  const cacheRef = React.useRef<Map<string, CachedSearch>>(new Map());
  // Current active search key (debounced) used for cache lookups.
  const currentSearchRef = React.useRef<string>('');
  // Token to ignore stale in-flight requests when search changes rapidly.
  const searchTokenRef = React.useRef(0);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const placeholder = searchPlaceholder ?? `Search ${title}...`;

  const loadInitial = React.useCallback(
    async (searchTerm: string) => {
      const token = ++searchTokenRef.current;
      setIsLoadingInitial(true);
      setError(null);
      try {
        const res = await fetchPage({
          search: searchTerm,
          page: 1,
          limit: pageSize,
        });
        if (token !== searchTokenRef.current) return;
        cacheRef.current.set(searchTerm, {
          options: res.options,
          total: res.total,
          hasMore: res.hasMore,
          nextPage: 2,
        });
        currentSearchRef.current = searchTerm;
        setOptions(res.options);
        setHasMore(res.hasMore);
      } catch (err) {
        if (token !== searchTokenRef.current) return;
        console.error('Failed to fetch filter options:', err);
        cacheRef.current.delete(searchTerm);
        setOptions([]);
        setHasMore(false);
        setError('Failed to load options');
      } finally {
        if (token === searchTokenRef.current) setIsLoadingInitial(false);
      }
    },
    [fetchPage, pageSize],
  );

  const loadMore = React.useCallback(async () => {
    const searchTerm = currentSearchRef.current;
    const cached = cacheRef.current.get(searchTerm);
    if (!cached || !cached.hasMore || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const res = await fetchPage({
        search: searchTerm,
        page: cached.nextPage,
        limit: pageSize,
      });
      const merged = [...cached.options, ...res.options];
      const updated: CachedSearch = {
        options: merged,
        total: res.total,
        hasMore: res.hasMore,
        nextPage: cached.nextPage + 1,
      };
      cacheRef.current.set(searchTerm, updated);
      setOptions(merged);
      setHasMore(res.hasMore);
    } catch (err) {
      console.error('Failed to fetch more filter options:', err);
      setError('Failed to load more options');
    } finally {
      setIsFetchingMore(false);
    }
  }, [fetchPage, pageSize, isFetchingMore]);

  const performSearch = React.useCallback(
    (searchTerm: string) => {
      const cached = cacheRef.current.get(searchTerm);
      if (cached) {
        searchTokenRef.current++; // cancel any in-flight initial load
        currentSearchRef.current = searchTerm;
        setOptions(cached.options);
        setHasMore(cached.hasMore);
        setIsLoadingInitial(false);
        setError(null);
        return;
      }
      void loadInitial(searchTerm);
    },
    [loadInitial],
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setFetchKey(k => k + 1);
      // First open: load the empty-search first page if not already cached.
      if (cacheRef.current.size === 0) {
        void loadInitial('');
      }
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      setIsSearching(false);
      performSearch(value);
    }, 300);
  };

  const handleSelectOption = (value: string) => {
    const newSelectedValues = new Set(selectedValues);
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }
    onSelectionChange(newSelectedValues);
  };

  const handleClearFilters = () => {
    onSelectionChange(new Set());
  };

  const handleListScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (
      target.scrollHeight - target.scrollTop - target.clientHeight < 24 &&
      hasMore &&
      !isFetchingMore &&
      !isLoadingInitial
    ) {
      void loadMore();
    }
  };

  // Merge already-selected values that are NOT present in the current page so
  // users can still see and deselect them.
  const labelByValue = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const option of options) map.set(option.value, option.label);
    for (const value of selectedValues) {
      if (!map.has(value)) map.set(value, value);
    }
    return map;
  }, [options, selectedValues]);

  const visibleOptions = React.useMemo(() => {
    const merged: DataTableFilterOption[] = [];
    const seen = new Set<string>();
    for (const option of options) {
      if (!seen.has(option.value)) {
        merged.push(option);
        seen.add(option.value);
      }
    }
    for (const value of selectedValues) {
      if (!seen.has(value)) {
        merged.push({ label: value, value });
        seen.add(value);
      }
    }
    return merged;
  }, [options, selectedValues]);

  const isInitialLoading = isLoadingInitial && options.length === 0;
  const isEmpty =
    !isInitialLoading && !isSearching && visibleOptions.length === 0;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <HugeiconsIcon icon={FilterIcon} className="mr-1.5 size-3.5" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2" />
              <Badge
                variant="secondary"
                className="rounded-full px-1.5 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-full px-1.5 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValues)
                    .map(value => labelByValue.get(value) ?? value)
                    .map(label => (
                      <Badge
                        key={label}
                        variant="secondary"
                        className="rounded-full px-1.5 font-normal"
                      >
                        {label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command key={fetchKey} shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={handleSearchChange}
          />
          <CommandList onScroll={handleListScroll} className="max-h-64">
            {isInitialLoading ? (
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-6">
                <Spinner className="size-4" />
                <span className="text-xs">Loading...</span>
              </div>
            ) : isEmpty ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <>
                {error && (
                  <div className="text-destructive px-2 py-1.5 text-xs">
                    {error}
                  </div>
                )}
                <CommandGroup>
                  {visibleOptions.map(option => {
                    const isSelected = selectedValues.has(option.value);

                    const handleSelect = () => handleSelectOption(option.value);

                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={handleSelect}
                        className="gap-2"
                        data-checked={isSelected}
                      >
                        <Checkbox
                          checked={isSelected}
                          className="pointer-events-none"
                        />
                        {option.icon && (
                          <option.icon
                            className={cn(
                              'text-muted-foreground size-4 shrink-0',
                            )}
                          />
                        )}
                        <span className="flex-1 truncate">{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {isFetchingMore && (
                  <div className="text-muted-foreground flex items-center justify-center gap-2 py-2">
                    <Spinner className="size-3.5" />
                    <span className="text-xs">Loading more…</span>
                  </div>
                )}
                {selectedValues.size > 0 && (
                  <>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={handleClearFilters}
                        className="text-muted-foreground justify-center text-center"
                      >
                        <HugeiconsIcon
                          icon={Cancel01Icon}
                          className="mr-1.5 size-3.5"
                        />
                        Clear filters
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
