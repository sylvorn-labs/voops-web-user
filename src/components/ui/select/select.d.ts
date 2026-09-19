import type * as React from 'react';
import type { Select as SelectPrimitive } from 'radix-ui';

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;
export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
>;
export type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
export type SelectValueProps = React.ComponentProps<
  typeof SelectPrimitive.Value
>;
