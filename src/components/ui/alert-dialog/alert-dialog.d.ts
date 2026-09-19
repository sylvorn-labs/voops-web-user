import type * as React from 'react';
import type { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

export type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
>;
export type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;
export type AlertDialogContentProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Content
>;
export type AlertDialogHeaderProps = React.ComponentProps<'div'>;
export type AlertDialogFooterProps = React.ComponentProps<'div'>;
export type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;
export type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;
export type AlertDialogActionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Action
>;
export type AlertDialogCancelProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Cancel
>;
