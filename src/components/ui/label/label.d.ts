import type { ComponentProps } from 'react';
import type { Label as RadixLabel } from 'radix-ui';
import type { VariantProps } from 'class-variance-authority';

import type { labelVariants } from './label.constants';

export interface LabelProps
  extends
    ComponentProps<typeof RadixLabel.Root>,
    VariantProps<typeof labelVariants> {}
