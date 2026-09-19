import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { Label as RadixLabel } from 'radix-ui';

const labelVariants = cva(
  'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none',
);

function Label({
  className,
  ...props
}: React.ComponentProps<typeof RadixLabel.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <RadixLabel.Root
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}

export { Label };
