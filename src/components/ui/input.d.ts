import type { ComponentProps, ReactNode } from 'react';

export interface InputProps extends ComponentProps<'input'> {
  startSlot?: ReactNode;
  endSlot?: ReactNode;
}
