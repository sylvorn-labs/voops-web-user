import type { ComponentProps } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import type { Slot } from 'radix-ui';

import type { Label } from '@/components/ui/label/Label';

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

export interface FormItemContextValue {
  id: string;
}

export interface FormItemProps extends ComponentProps<'div'> {}

export interface FormLabelProps extends ComponentProps<typeof Label> {}

export interface FormControlProps extends ComponentProps<typeof Slot.Root> {}

export interface FormDescriptionProps extends ComponentProps<'p'> {}

export interface FormMessageProps extends ComponentProps<'p'> {}
