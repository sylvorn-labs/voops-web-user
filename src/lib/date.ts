import { format } from 'date-fns';

export function formatDateOnly(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function parseDateOnly(value: string): Date {
  const [datePart] = value.split(/[T ]/);
  return new Date(`${datePart}T00:00:00`);
}
