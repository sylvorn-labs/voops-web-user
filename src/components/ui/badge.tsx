import { cn } from 'cn';

import { badgeVariants } from './badge.constants';
import type { BadgeProps } from './badge.d';

export function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
