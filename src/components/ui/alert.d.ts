import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { alertVariants } from './alert.constants';

export interface AlertProps
  extends ComponentProps<'div'>,
    VariantProps<typeof alertVariants> {}

export interface AlertTitleProps extends ComponentProps<'div'> {}

export interface AlertDescriptionProps extends ComponentProps<'div'> {}
