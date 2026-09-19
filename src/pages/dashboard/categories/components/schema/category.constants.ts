import type { CategoryFormValues } from './category.d';

export const CATEGORY_FORM_DEFAULT_VALUES: CategoryFormValues = {
  name: '',
  kind: 'expense',
  color: '#6366F1',
};

export const CATEGORY_KIND_OPTIONS = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
  { value: 'both', label: 'Both (Income & Expense)' },
] as const;

export const CATEGORY_COLOR_PRESETS = [
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Rose', value: '#F43F5E' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Sky', value: '#0EA5E9' },
  { label: 'Violet', value: '#8B5CF6' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Orange', value: '#F97316' },
] as const;
