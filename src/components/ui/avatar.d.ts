import type { ComponentProps } from 'react';
import type { Avatar as AvatarPrimitive } from 'radix-ui';

export interface AvatarProps
  extends ComponentProps<typeof AvatarPrimitive.Root> {
  size?: 'default' | 'sm' | 'lg';
}

export interface AvatarImageProps
  extends ComponentProps<typeof AvatarPrimitive.Image> {}

export interface AvatarFallbackProps
  extends ComponentProps<typeof AvatarPrimitive.Fallback> {}

export interface AvatarBadgeProps extends ComponentProps<'span'> {}

export interface AvatarGroupProps extends ComponentProps<'div'> {}

export interface AvatarGroupCountProps extends ComponentProps<'div'> {}
