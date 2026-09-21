import * as React from 'react';
import { cn } from '@/lib/utils';

import type { InputProps } from './input.d';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startSlot, endSlot, ...props }, ref) => {
    if (startSlot || endSlot) {
      return (
        <div className="relative flex w-full items-center">
          {startSlot && (
            <div className="text-muted-foreground pointer-events-none absolute left-3 flex items-center justify-center [&_svg]:size-4">
              {startSlot}
            </div>
          )}
          <input
            type={type}
            data-slot="input"
            className={cn(
              'border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex h-10 w-full rounded-xl border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color] focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
              startSlot && 'pl-9',
              endSlot && 'pr-9',
              className,
            )}
            ref={ref}
            {...props}
          />
          {endSlot && (
            <div className="text-muted-foreground absolute right-3 flex items-center justify-center">
              {endSlot}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex h-10 w-full rounded-xl border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow,border-color] focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
