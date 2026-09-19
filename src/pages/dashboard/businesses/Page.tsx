import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import { BuildingIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { toast } from 'sonner';

import { PageHeader } from '@/components/dashboard/page-header/PageHeader';
import { Button } from '@/components/ui/button/Button';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty/Empty';
import { listBusinessesOptions } from '@/hooks/api/business.hook';
import {
  useActiveBusinessId,
  useSetActiveBusinessId,
} from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import type { BusinessListItem } from '@/types/api/business.d';
import { BusinessGrid } from './components/business-grid/BusinessGrid';
import { BusinessDeleteDialog } from './components/business-delete-dialog/BusinessDeleteDialog';

export function BusinessListPage() {
  const openSheet = useSheetOpen();
  const { data, isLoading, isError, error } = useQuery(listBusinessesOptions());

  const activeBusinessId = useActiveBusinessId();
  const setActiveBusinessId = useSetActiveBusinessId();

  const [businessToDelete, setBusinessToDelete] =
    useState<BusinessListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const businesses = data?.data?.items ?? [];

  const handleSelect = (business: BusinessListItem) => {
    setActiveBusinessId(business.id);
    toast.success(`Switched active workspace to "${business.name}"`);
  };

  const handleAddBusiness = () => {
    openSheet({
      sheetKey: 'business',
      mode: 'add',
      title: 'Add Business',
      description: 'Create a new business workspace to track finances.',
    });
  };

  const handleEdit = (business: BusinessListItem) => {
    openSheet({
      sheetKey: 'business',
      mode: 'edit',
      id: business.id,
      title: 'Edit Business',
      description: 'Update business workspace name and currency.',
    });
  };

  const handleDelete = (business: BusinessListItem) => {
    setBusinessToDelete(business);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-8 p-6 lg:p-10">
      <PageHeader
        title="Businesses"
        description="Manage your business profiles, switch active workspace, or register new ones."
        opposite={
          <Button onClick={handleAddBusiness}>
            <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
            Add Business
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border-border space-y-4 rounded-2xl border p-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-11 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-3 w-40" />
              <div className="border-border/50 flex justify-between border-t pt-4">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="border-destructive/20 bg-destructive/5 rounded-2xl border p-8 text-center">
          <p className="text-destructive font-medium">
            Failed to load businesses: {error?.message || 'Unknown error'}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      ) : businesses.length === 0 ? (
        <div className="border-border/60 rounded-2xl border border-dashed py-16">
          <Empty>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={BuildingIcon} size={24} />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No businesses found</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t added any businesses yet. Create your first
                business to start tracking accounts and expenses.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={handleAddBusiness}>
                <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
                Create Business
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <BusinessGrid
          businesses={businesses}
          activeBusinessId={activeBusinessId}
          onSelect={handleSelect}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BusinessDeleteDialog
        business={businessToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </div>
  );
}
