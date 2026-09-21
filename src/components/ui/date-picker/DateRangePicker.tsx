import * as React from 'react';
import { CalendarIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/Popover';
import { Calendar } from '@/components/ui/calendar/Calendar';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import type { DateRangePickerProps } from './date-picker.d';

export function DateRangePicker({
  value,
  onValueChange,
  placeholder = 'Select date range',
  disabled = false,
  className,
  align = 'start',
  clearable = true,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const hasValue = Boolean(value?.from || value?.to);

  const handleSelect = (range: DateRange | undefined) => {
    onValueChange?.(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(undefined);
  };

  const renderLabel = () => {
    if (value?.from) {
      if (value.to) {
        return `${format(value.from, 'MMM d, yyyy')} – ${format(value.to, 'MMM d, yyyy')}`;
      }
      return `${format(value.from, 'MMM d, yyyy')} – End date`;
    }
    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!hasValue}
          className={cn(
            'border-input bg-background hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/30 data-[empty=true]:text-muted-foreground relative flex h-10 w-full items-center justify-start rounded-xl px-3 text-left font-normal shadow-xs transition-[color,box-shadow,border-color] focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          <HugeiconsIcon
            icon={CalendarIcon}
            className="text-muted-foreground mr-2 size-4 shrink-0"
          />
          <span className="flex-1 truncate">{renderLabel()}</span>
          {clearable && hasValue && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  onValueChange?.(undefined);
                }
              }}
              className="text-muted-foreground hover:text-foreground hover:bg-muted ml-2 flex size-5 items-center justify-center rounded-sm transition-colors"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
              <span className="sr-only">Clear dates</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex flex-col p-3">
          <Calendar
            mode="range"
            selected={value}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          {clearable && hasValue && (
            <div className="border-border mt-2 flex justify-end border-t pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onValueChange?.(undefined);
                  setOpen(false);
                }}
                className="text-muted-foreground hover:text-foreground h-7 px-2 text-xs"
              >
                Clear Range
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
