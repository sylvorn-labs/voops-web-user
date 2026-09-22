import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlusSignIcon, Tag01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import type {
  CategoryListItem,
  ListCategoriesParams,
} from '@/types/api/category.d';

import { CategoryDeleteDialog } from '@/pages/categories/components/category-delete-dialog/CategoryDeleteDialog';
import { getCategoryRowActions } from './categories.actions';
import { getCategoryColumns } from './categories.columns';
import {
  CATEGORY_DATE_RANGE_COLUMNS,
  CATEGORY_DEFAULT_DATE_FIELD,
  CATEGORY_FILTERABLE_COLUMNS,
  CATEGORY_SEARCHABLE_COLUMNS,
} from './categories.filters';
import { useCategoryServerTable } from './categories.server-table';

export function CategoryListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();

  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dateField, setDateField] = useState<
    NonNullable<ListCategoriesParams['dateField']>
  >(CATEGORY_DEFAULT_DATE_FIELD);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Categories' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddCategory = () => {
    openSheet({
      sheetKey: 'category',
      mode: 'add',
      title: 'Add Category',
      description: 'Create a new category to organize income and expenses.',
    });
  };

  const rowActions = useMemo(
    () =>
      getCategoryRowActions({
        navigate,
        openSheet,
        onDeleteCategory: category => {
          setCategoryToDelete(category);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet],
  );

  const columns = useMemo(() => getCategoryColumns(rowActions), [rowActions]);

  const table = useCategoryServerTable(activeBusinessId, dateField);

  const handleReset = () => {
    setDateField(CATEGORY_DEFAULT_DATE_FIELD);
    table.onReset();
  };

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
          searchableColumns: CATEGORY_SEARCHABLE_COLUMNS,
          filterableColumns: CATEGORY_FILTERABLE_COLUMNS,
          dateRangeColumns: CATEGORY_DATE_RANGE_COLUMNS,
          currentDateField: dateField,
          onDateFieldChange: value =>
            setDateField(
              value as NonNullable<ListCategoriesParams['dateField']>,
            ),
          currentStartDate: table.params.start_date,
          currentEndDate: table.params.end_date,
          onDateRangeChange: table.onDateRangeChange,
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
          onReset: handleReset,
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
