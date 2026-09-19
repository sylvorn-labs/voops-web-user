import { cva } from 'class-variance-authority';

export const alertVariants = cva(
  'relative w-full rounded-2xl border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 text-foreground border-border',
        destructive:
          'border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/40 dark:bg-destructive/15 [&>svg]:text-destructive',
        success:
          'border-income/30 bg-income/10 text-income dark:border-income/40 dark:bg-income/15 [&>svg]:text-income',
        warning:
          'border-warning/30 bg-warning/10 text-warning dark:border-warning/40 dark:bg-warning/15 [&>svg]:text-warning',
        info: 'border-info/30 bg-info/10 text-info dark:border-info/40 dark:bg-info/15 [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
