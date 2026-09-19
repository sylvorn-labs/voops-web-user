import { cn } from 'cn';

import type { LoadingFallbackProps } from './LoadingFallback.d';

export function LoadingFallback({
  label = 'Loading...',
  className,
}: LoadingFallbackProps) {
  return (
    <div
      className={cn(
        'bg-background text-muted-foreground flex h-dvh w-dvw items-center justify-center text-sm',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <div className="border-primary size-4 animate-spin rounded-full border-2 border-t-transparent" />
        <span>{label}</span>
      </div>
    </div>
  );
}
