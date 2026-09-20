import * as React from 'react';
import { CalendarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { format } from 'date-fns';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover/Popover';
import { Calendar } from '@/components/ui/calendar/Calendar';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import type { DatePickerProps } from './date-picker.d';

export function DatePicker({
  date,
  onSelect,
  placeholder = 'Pick a date',
  disabled = false,
  className,
  align = 'start',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    onSelect?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-empty={!date}
          className={cn(
            'border-input bg-background hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/30 data-[empty=true]:text-muted-foreground h-10 w-full justify-start rounded-xl px-3 text-left font-normal shadow-xs transition-[color,box-shadow,border-color] focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          <HugeiconsIcon
            icon={CalendarIcon}
            className="text-muted-foreground mr-2 size-4 shrink-0"
          />
          {date ? (
            <span className="text-foreground">{format(date, 'PPP')}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
