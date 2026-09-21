import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface DataCardPropertyRowProps {
  label: string;
  value: ReactNode;
  variant?: 'default' | 'destructive' | 'muted';
  className?: string;
}

export function DataCardPropertyRow({
  label,
  value,
  variant = 'default',
  className,
}: DataCardPropertyRowProps) {
  return (
    <div
      data-slot="data-card-property-row"
      className={cn(
        'flex items-center justify-between gap-4 text-xs',
        className,
      )}
    >
      <span className="text-muted-foreground font-medium">{label}</span>
      <span
        className={cn(
          'text-right font-medium',
          variant === 'default' && 'text-foreground',
          variant === 'destructive' && 'text-destructive',
          variant === 'muted' && 'text-muted-foreground',
        )}
      >
        {value}
      </span>
    </div>
  );
}

export interface DataCardTimestampGroupProps {
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  className?: string;
}

export function DataCardTimestampGroup({
  createdAt,
  updatedAt,
  deletedAt,
  className,
}: DataCardTimestampGroupProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      data-slot="data-card-timestamp-group"
      className={cn('flex flex-col gap-2.5 border-t pt-3', className)}
    >
      {createdAt && (
        <DataCardPropertyRow label="Created at" value={formatDate(createdAt)} />
      )}
      {updatedAt && (
        <DataCardPropertyRow label="Updated at" value={formatDate(updatedAt)} />
      )}
      {deletedAt && (
        <DataCardPropertyRow
          label="Deleted at"
          value={formatDate(deletedAt)}
          variant="destructive"
        />
      )}
    </div>
  );
}
