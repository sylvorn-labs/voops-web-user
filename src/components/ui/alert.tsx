import { cn } from 'cn';

import { alertVariants } from './alert.constants';
import type {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from './alert.d';

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 font-medium tracking-tight', className)}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'col-start-2 text-xs leading-relaxed opacity-90',
        className,
      )}
      {...props}
    />
  );
}

export { alertVariants };
