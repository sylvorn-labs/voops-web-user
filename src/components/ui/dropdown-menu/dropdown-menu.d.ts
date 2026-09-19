import type * as React from 'react';
import type { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

export type DropdownMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;
export type DropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;
export type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;
export type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
>;
