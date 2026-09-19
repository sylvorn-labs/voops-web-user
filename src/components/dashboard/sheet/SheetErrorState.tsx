import { AlertCircleIcon, RefreshIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { SheetErrorStateProps } from '@/types/sheet';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

/**
 * `SheetErrorState`
 *
 * Rendered inside a sheet when a query fails or returns no data.
 * Displays a centred error icon, a human-readable message, and an optional
 * "Try again" button that calls `onRetry` (typically `query.refetch()`).
 *
 * @example
 * ```tsx
 * if (isError || !data) {
 *   return <SheetErrorState message="Failed to load inquiry." onRetry={refetch} />;
 * }
 * ```
 */
export function SheetErrorState({
  message = 'Something went wrong while loading this content.',
  onRetry,
}: SheetErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        'min-h-64 px-8 py-12 text-center',
      )}
    >
      {/* Icon */}
      <div className="bg-destructive/10 flex size-12 items-center justify-center rounded-full">
        <HugeiconsIcon
          icon={AlertCircleIcon}
          className="text-destructive size-6"
          strokeWidth={1.5}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        <p className="text-foreground text-sm font-medium">Failed to load</p>
        <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
          {message}
        </p>
      </div>

      {/* Retry */}
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-1.5"
        >
          <HugeiconsIcon icon={RefreshIcon} className="size-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
}
