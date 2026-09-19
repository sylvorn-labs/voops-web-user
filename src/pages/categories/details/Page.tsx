import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft01Icon,
  Delete02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DetailsLayout } from '@/layouts/dashboard-detail/DetailsLayout';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import { Loading } from '@/components/global/Loading';
import { Error } from '@/components/global/Error';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { getCategoryByIdOptions } from '@/hooks/api/category.hook';

import { CategoryDeleteDialog } from '@/pages/categories/components/category-delete-dialog/CategoryDeleteDialog';
import { CategoryBasicTab } from './components/category-basic-tab/CategoryBasicTab';

export function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getCategoryByIdOptions(id || ''),
  );

  const category = data?.data;

  useEffect(() => {
    if (category) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Categories', href: '/dashboard/categories' },
        { label: category.name },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Categories', href: '/dashboard/categories' },
      ]);
    }
  }, [category, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading category details..." />;
  }

  if (isError || !category) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Category not found"
          description="The requested category does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Categories',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/categories'),
          }}
          secondaryAction={{
            label: 'Try Again',
            icon: RefreshIcon,
            onClick: () => void refetch(),
          }}
        />
      </div>
    );
  }

  const handleEditInSheet = () => {
    openSheet({
      sheetKey: 'category',
      mode: 'edit',
      id: category.id,
      title: 'Edit Category',
      description: 'Update category details and type.',
    });
  };

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <CategoryBasicTab category={category} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title: category.name,
          description: 'Category configuration and audit details.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/categories')}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-1 size-4" />
                Back
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="size-8 p-0">
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      className="size-4"
                    />
                    <span className="sr-only">Open actions menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-fit min-w-[160px]"
                >
                  <DropdownMenuItem
                    onClick={handleEditInSheet}
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                    Edit category
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Delete category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <CategoryDeleteDialog
        category={category}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/categories')}
      />
    </>
  );
}
