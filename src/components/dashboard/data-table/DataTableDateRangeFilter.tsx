import { CalendarIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import type { DateRange } from 'react-day-picker';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';
import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/Popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';

import type { DataTableDateFieldOption } from '@/components/dashboard/data-table/types';
import { Calendar } from '@/components/ui/calendar/Calendar';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

interface DataTableDateRangeFilterProps {
  title: string;
  value?: DateRange;
  onDateChange: (range: DateRange) => void;
  /** Optional date fields the range can target. Renders a selector when set. */
  fields?: DataTableDateFieldOption[];
  /** Currently selected field value (defaults to the first field). */
  selectedField?: string;
  onFieldChange?: (field: string) => void;
}

export function DataTableDateRangeFilter({
  title,
  value,
  onDateChange,
  fields,
  selectedField,
  onFieldChange,
}: DataTableDateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);

  const hasFields = !!fields && fields.length > 0;
  const activeField = hasFields
    ? (fields.find(f => f.value === selectedField) ?? fields[0])
    : undefined;

  const range: DateRange = value ?? { from: undefined, to: undefined };
  const hasValue = range.from !== undefined || range.to !== undefined;

  const handleSelect = (selected: DateRange | undefined) => {
    onDateChange(selected ?? { from: undefined, to: undefined });
    if (selected?.from && selected?.to) {
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    onDateChange({ from: undefined, to: undefined });
  };

  const getButtonLabel = () => {
    if (range.from && range.to) {
      return `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}`;
    }
    if (range.from) {
      return `${format(range.from, 'MMM d, yyyy')} - End date`;
    }
    return activeField ? activeField.label : title;
  };

  const rangeKey = range.from
    ? range.to
      ? `${range.from.getTime()}-${range.to.getTime()}`
      : `${range.from.getTime()}-undefined`
    : 'empty';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          size="sm"
          className={cn('h-8 border-dashed', hasValue && 'text-foreground')}
        >
          <HugeiconsIcon icon={CalendarIcon} className="mr-1.5 size-3.5" />
          {hasValue ? (
            <span className="truncate">
              {activeField ? `${activeField.label}: ` : ''}
              {getButtonLabel()}
            </span>
          ) : (
            title
          )}
          {hasValue && (
            <HugeiconsIcon
              icon={Cancel01Icon}
              className="text-muted-foreground hover:text-foreground ml-1 size-3"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col gap-2 p-3">
          {hasFields && (
            <Select
              value={activeField?.value}
              onValueChange={next => onFieldChange?.(next ? next : '')}
            >
              <SelectTrigger size="sm" className="w-full">
                <SelectValue placeholder="Date field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map(field => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Calendar
            key={`${activeField?.value ?? 'default'}-${rangeKey}`}
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={
              activeField?.allowFuture ? undefined : date => date > new Date()
            }
          />
          {hasValue && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground h-7 px-2 text-xs"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
