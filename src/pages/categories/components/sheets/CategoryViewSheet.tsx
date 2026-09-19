import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Edit02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import { getCategoryByIdOptions } from '@/hooks/api/category.hook';
import { CategoryBadge } from '@/pages/categories/list/components/category-badge/CategoryBadge';
import type { ViewSheetProps } from '@/types/sheet.d';

export function CategoryViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);

  const { data, isLoading, isError, refetch } = useQuery(
    getCategoryByIdOptions(id),
  );

  const category = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !category) {
    return (
      <SheetErrorState
        message="Failed to load category details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/categories/${category.id}`);
  };

  const formattedCreatedAt = new Date(category.created_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(category.updated_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <SheetActionBar>
        <SheetActionBar.Button
          icon={Edit02Icon}
          label="Edit"
          variant="outline"
          onClick={() => switchMode('edit')}
        />
        <SheetActionBar.Button
          icon={ArrowRight01Icon}
          label="Full Details"
          variant="outline"
          onClick={handleOpenDetails}
        />
      </SheetActionBar>

      <SheetFieldGroup title="Category Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Name" value={category.name} />
          <SheetDetailRow
            label="Type"
            value={<CategoryBadge kind={category.kind} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Color"
            value={
              category.color ? (
                <div className="flex items-center gap-2">
                  <span
                    className="size-3.5 rounded-full border shadow-xs"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-mono text-xs">{category.color}</span>
                </div>
              ) : (
                'Not specified'
              )
            }
          />
          <SheetDetailRow label="Category ID" value={category.id} copyable />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Audit Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Created At" value={formattedCreatedAt} />
          <SheetDetailRow label="Last Updated" value={formattedUpdatedAt} />
        </div>
      </SheetFieldGroup>
    </div>
  );
}
