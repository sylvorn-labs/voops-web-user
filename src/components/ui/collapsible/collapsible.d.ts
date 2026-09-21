import type * as React from 'react';
import type { Collapsible as CollapsiblePrimitive } from 'radix-ui';

export type CollapsibleProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>;
export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;
export type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>;
