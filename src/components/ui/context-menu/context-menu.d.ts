import type { ComponentProps } from 'react';
import type { ContextMenu as ContextMenuPrimitive } from 'radix-ui';

export interface ContextMenuProps extends ComponentProps<
  typeof ContextMenuPrimitive.Root
> {}

export interface ContextMenuTriggerProps extends ComponentProps<
  typeof ContextMenuPrimitive.Trigger
> {}

export interface ContextMenuGroupProps extends ComponentProps<
  typeof ContextMenuPrimitive.Group
> {}

export interface ContextMenuPortalProps extends ComponentProps<
  typeof ContextMenuPrimitive.Portal
> {}

export interface ContextMenuSubProps extends ComponentProps<
  typeof ContextMenuPrimitive.Sub
> {}

export interface ContextMenuRadioGroupProps extends ComponentProps<
  typeof ContextMenuPrimitive.RadioGroup
> {}

export interface ContextMenuContentProps extends ComponentProps<
  typeof ContextMenuPrimitive.Content
> {
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export interface ContextMenuItemProps extends ComponentProps<
  typeof ContextMenuPrimitive.Item
> {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

export interface ContextMenuSubTriggerProps extends ComponentProps<
  typeof ContextMenuPrimitive.SubTrigger
> {
  inset?: boolean;
}

export interface ContextMenuSubContentProps extends ComponentProps<
  typeof ContextMenuPrimitive.SubContent
> {}

export interface ContextMenuCheckboxItemProps extends ComponentProps<
  typeof ContextMenuPrimitive.CheckboxItem
> {
  inset?: boolean;
}

export interface ContextMenuRadioItemProps extends ComponentProps<
  typeof ContextMenuPrimitive.RadioItem
> {
  inset?: boolean;
}

export interface ContextMenuLabelProps extends ComponentProps<
  typeof ContextMenuPrimitive.Label
> {
  inset?: boolean;
}

export interface ContextMenuSeparatorProps extends ComponentProps<
  typeof ContextMenuPrimitive.Separator
> {}

export interface ContextMenuShortcutProps extends ComponentProps<'span'> {}
