import type { NavigateFunction } from 'react-router';
import {
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';

import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { CategoryListItem } from '@/types/api/category.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface CategoryRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onDeleteCategory: (category: CategoryListItem) => void;
}

export function getCategoryRowActions({
  navigate,
  openSheet,
  onDeleteCategory,
}: CategoryRowActionsOptions): RowActionConfig<CategoryListItem>[] {
  return [
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: category => {
        openSheet({
          sheetKey: 'category',
          mode: 'view',
          id: category.id,
          title: category.name,
          description: 'Category Information',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: category => {
        navigate(`/dashboard/categories/${category.id}`);
      },
    },
    {
      id: 'edit',
      label: 'Edit category',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: category => {
        openSheet({
          sheetKey: 'category',
          mode: 'edit',
          id: category.id,
          title: 'Edit Category',
          description: 'Update category details and type.',
        });
      },
    },
    {
      id: 'delete',
      label: 'Delete category',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: category => {
        onDeleteCategory(category);
      },
    },
  ];
}
