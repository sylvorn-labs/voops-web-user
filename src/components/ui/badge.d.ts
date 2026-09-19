import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { badgeVariants } from './badge.constants';

export interface BadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
