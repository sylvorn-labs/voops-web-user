import { Label as RadixLabel } from 'radix-ui';
import { cn } from '@/lib/utils';

import { labelVariants } from './label.constants';
import type { LabelProps } from './label.d';

export function Label({ className, ...props }: LabelProps) {
  return (
    <RadixLabel.Root
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}

export { labelVariants };
