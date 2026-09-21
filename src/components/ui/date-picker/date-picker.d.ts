import type { DateRange } from 'react-day-picker';

export interface DatePickerProps {
  date?: Date;
  onSelect?: (date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export interface DateRangePickerProps {
  value?: DateRange;
  onValueChange?: (range?: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  align?: 'start' | 'center' | 'end';
  clearable?: boolean;
}
