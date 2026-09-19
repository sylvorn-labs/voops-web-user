import type * as React from 'react';
import type { Tabs as TabsPrimitive } from 'radix-ui';

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;
export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;
export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>;
export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>;
