import type { ComponentProps } from 'react';
import type { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';

export interface NavigationMenuProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Root> {
  viewport?: boolean;
}

export interface NavigationMenuListProps
  extends ComponentProps<typeof NavigationMenuPrimitive.List> {}

export interface NavigationMenuItemProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Item> {}

export interface NavigationMenuTriggerProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Trigger> {}

export interface NavigationMenuContentProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Content> {}

export interface NavigationMenuViewportProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Viewport> {}

export interface NavigationMenuLinkProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Link> {}

export interface NavigationMenuIndicatorProps
  extends ComponentProps<typeof NavigationMenuPrimitive.Indicator> {}
