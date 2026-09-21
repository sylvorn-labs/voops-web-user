import type { CategoryKind } from '@/types/api/category.d';

export const CATEGORY_KIND_STYLES: Record<CategoryKind, string> = {
  income: 'border-brand-7/25 bg-brand-7/15 text-brand-7 hover:bg-brand-7/25',
  expense:
    'border-brand-11/25 bg-brand-11/15 text-brand-11 hover:bg-brand-11/25',
  both: 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25',
};
