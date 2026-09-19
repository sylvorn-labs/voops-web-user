import type { CategoryKind } from '@/types/api/category.d';

export interface CategoryBadgeProps {
  kind: CategoryKind;
  color?: string | null;
  className?: string;
}
