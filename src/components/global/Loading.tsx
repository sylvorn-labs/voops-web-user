import { Spinner } from '@/components/ui/spinner/Spinner';
import { cn } from '@/lib/utils';

import type { LoadingProps } from './types.d';

export function Loading({ message, className }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center justify-center',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Spinner className="text-primary size-8" />
        <span className="text-primary ml-4 text-lg font-medium">{message}</span>
      </div>
    </div>
  );
}
