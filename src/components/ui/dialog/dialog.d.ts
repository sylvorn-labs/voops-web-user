import type * as React from 'react';
import type { Dialog as DialogPrimitive } from 'radix-ui';

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;
export type DialogContentProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
export type DialogHeaderProps = React.ComponentProps<'div'>;
export type DialogFooterProps = React.ComponentProps<'div'>;
export type DialogTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;
export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
