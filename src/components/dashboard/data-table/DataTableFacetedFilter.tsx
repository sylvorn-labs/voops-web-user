import { Cancel01Icon, FilterIcon } from '@hugeicons/core-free-icons';
import type { Column } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';

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

import { Separator } from '@/components/ui/separator/Separator';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Button } from '@/components/ui/button/Button';
import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';

import type { DataTableFilterOption } from './types';

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFilterOption[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelectOption = (value: string) => {
    const newSelectedValues = new Set(selectedValues);
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }
    const filterValues = Array.from(newSelectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const handleClearFilters = () => {
    column?.setFilterValue(undefined);
  };

  return (
    <Popover>
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
                  options
                    .filter(option => selectedValues.has(option.value))
                    .map(option => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className="rounded-full px-1.5 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value);
                const count = facets?.get(option.value);

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
                        className={cn('text-muted-foreground size-4 shrink-0')}
                      />
                    )}
                    <span className="flex-1 truncate">{option.label}</span>
                    {count !== undefined && (
                      <span className="text-muted-foreground ml-auto shrink-0 font-mono text-xs">
                        {count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
