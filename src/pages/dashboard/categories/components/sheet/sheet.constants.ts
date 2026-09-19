import type { CategoryKind } from '@/types/api/category.d';
import type { CategoryFormValues } from './sheet.d';

export const CATEGORY_FORM_DEFAULT_VALUES: CategoryFormValues = {
  name: '',
  kind: 'expense',
  color: '#6366F1',
};

export const CATEGORY_KIND_OPTIONS: { label: string; value: CategoryKind }[] = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
  { label: 'Both (Income & Expense)', value: 'both' },
];

export const CATEGORY_COLOR_PRESETS = [
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Rose', value: '#F43F5E' },
  { label: 'Cyan', value: '#06B6D4' },
  { label: 'Violet', value: '#8B5CF6' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Slate', value: '#64748B' },
];
