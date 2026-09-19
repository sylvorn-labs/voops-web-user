import type { ComponentProps } from 'react';
import type { Dialog as SheetPrimitive } from 'radix-ui';

export interface SheetProps extends ComponentProps<
  typeof SheetPrimitive.Root
> {}

export interface SheetTriggerProps extends ComponentProps<
  typeof SheetPrimitive.Trigger
> {}

export interface SheetCloseProps extends ComponentProps<
  typeof SheetPrimitive.Close
> {}

export interface SheetPortalProps extends ComponentProps<
  typeof SheetPrimitive.Portal
> {}

export interface SheetOverlayProps extends ComponentProps<
  typeof SheetPrimitive.Overlay
> {}

export interface SheetContentProps extends ComponentProps<
  typeof SheetPrimitive.Content
> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}

export interface SheetHeaderProps extends ComponentProps<'div'> {}

export interface SheetFooterProps extends ComponentProps<'div'> {}

export interface SheetTitleProps extends ComponentProps<
  typeof SheetPrimitive.Title
> {}

export interface SheetDescriptionProps extends ComponentProps<
  typeof SheetPrimitive.Description
> {}
