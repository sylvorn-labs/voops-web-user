import type { CategoryKind } from '@/types/api/category.d';

export const CATEGORY_KIND_BADGE_VARIANTS: Record<
  CategoryKind,
  'income' | 'expense' | 'secondary'
> = {
  income: 'income',
  expense: 'expense',
  both: 'secondary',
};
