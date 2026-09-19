import type { CategoryListItem } from '@/types/api/category.d';

export interface CategoryDeleteDialogProps {
  category: CategoryListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
