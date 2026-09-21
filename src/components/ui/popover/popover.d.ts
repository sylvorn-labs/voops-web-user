import type * as React from 'react';
import type { Popover as PopoverPrimitive } from 'radix-ui';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;
export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
