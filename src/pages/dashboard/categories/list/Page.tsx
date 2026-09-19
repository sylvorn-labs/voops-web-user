import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  PlusSignIcon,
  Tag01Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableColumnHeader } from '@/components/dashboard/data-table/DataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/data-table/data-table-row-actions';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type {
  RowActionConfig,
  ServerTableParams,
} from '@/components/dashboard/data-table/types';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { CategoryAPI } from '@/api/category.api';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import type {
  CategoryListItem,
  CategoryKind,
  CategorySortBy,
} from '@/types/api/category.d';

import { CategoryDeleteDialog } from '@/pages/dashboard/categories/components/category-delete-dialog/CategoryDeleteDialog';
import { CategoryBadge } from './components/category-badge/CategoryBadge';

export function CategoryListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddCategory = () => {
    openSheet({
      sheetKey: 'category',
      mode: 'add',
      title: 'Add Category',
      description: 'Create a new category to organize income and expenses.',
    });
  };

  const rowActions: RowActionConfig<CategoryListItem>[] = useMemo(
    () => [
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
          setCategoryToDelete(category);
          setIsDeleteDialogOpen(true);
        },
      },
    ],
    [navigate, openSheet],
  );

  const columns = useMemo<ColumnDef<CategoryListItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          const category = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <span
                className="size-3 rounded-full border shadow-xs"
                style={{ backgroundColor: category.color || '#6366F1' }}
              />
              <span className="text-foreground font-medium">
                {category.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'kind',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => (
          <CategoryBadge kind={row.original.kind} color={row.original.color} />
        ),
      },
      {
        accessorKey: 'color',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground font-mono text-xs">
            {row.original.color || '—'}
          </span>
        ),
      },
      {
        accessorKey: 'created_at',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
          const date = new Date(row.original.created_at);
          return (
            <span className="text-muted-foreground text-xs">
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <DataTableRowActions row={row} actions={rowActions} />
        ),
      },
    ],
    [rowActions],
  );

  const queryFn = async (tableParams: ServerTableParams) => {
    if (!activeBusinessId) {
      return {
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };
    }

    const res = await CategoryAPI.getInstance().list({
      business_id: activeBusinessId,
      page: tableParams.page,
      limit: tableParams.limit,
      search: tableParams.q,
      kind: tableParams.filters?.kind?.[0] as CategoryKind | undefined,
      sortBy: tableParams.sort_by as CategorySortBy | undefined,
      sortOrder: tableParams.sort_dir,
      startDate: tableParams.start_date,
      endDate: tableParams.end_date,
    });

    return {
      items: res.data.items,
      total: res.data.total,
      page: res.data.page,
      limit: res.data.limit,
      totalPages: res.data.totalPages,
    };
  };

  const table = useServerTable<CategoryListItem>({
    queryKey: ['categories', activeBusinessId ?? ''],
    queryFn,
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={Tag01Icon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view categories."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Categories',
          description:
            'Organize your finances with income and expense categories.',
          opposite: (
            <Button onClick={handleAddCategory}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
              Add Category
            </Button>
          ),
        }}
        dataTable={{
          mode: 'server',
          columns,
          data: table.data,
          totalRows: table.totalRows,
          isLoading: table.isLoading,
          isFetching: table.isFetching,
          isError: table.isError,
          errorTitle: 'Failed to load categories',
          errorDescription: table.error?.message,
          searchableColumns: [{ id: 'name', title: 'Category name' }],
          filterableColumns: [
            {
              id: 'kind',
              title: 'Type',
              options: [
                { label: 'Income', value: 'income' },
                { label: 'Expense', value: 'expense' },
                { label: 'Both', value: 'both' },
              ],
            },
          ],
          currentSearch: table.params.q,
          onSearchChange: table.onSearchChange,
          currentPage: table.params.page,
          onPageChange: table.onPageChange,
          currentPageSize: table.params.limit,
          onPageSizeChange: table.onPageSizeChange,
          currentSortBy: table.params.sort_by,
          currentSortDir: table.params.sort_dir,
          onSortChange: table.onSortChange,
          currentFilters: table.params.filters,
          onFilterChange: table.onFilterChange,
          onReset: table.onReset,
          renderRowContextMenu: row => (
            <DataTableRowContextMenuContent row={row} actions={rowActions} />
          ),
          onRowClick: category =>
            openSheet({
              sheetKey: 'category',
              mode: 'view',
              id: category.id,
              title: category.name,
              description: 'Category Information',
            }),
          emptyTitle: 'No categories found',
          emptyDescription:
            'Start classifying your transactions by adding your first category.',
          emptyActionLabel: 'Add Category',
          onEmptyAction: handleAddCategory,
        }}
      />

      <CategoryDeleteDialog
        category={categoryToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
