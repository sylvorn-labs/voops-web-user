import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { buttonVariants } from './button.constants';

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
