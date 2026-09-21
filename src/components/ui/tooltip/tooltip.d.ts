import type * as React from 'react';
import type { Tooltip as TooltipPrimitive } from 'radix-ui';

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;
export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>;
