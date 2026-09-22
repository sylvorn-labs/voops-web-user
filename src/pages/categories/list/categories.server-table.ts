import { CategoryAPI } from '@/api/category.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  CategoryListItem,
  CategoryKind,
  CategorySortBy,
  ListCategoriesParams,
} from '@/types/api/category.d';

export async function fetchCategoriesServerTable(
  businessId: string,
  tableParams: ServerTableParams,
  dateField?: ListCategoriesParams['dateField'],
) {
  const res = await CategoryAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    kind: tableParams.filters?.kind?.[0] as CategoryKind | undefined,
    sortBy: tableParams.sort_by as CategorySortBy | undefined,
    sortOrder: tableParams.sort_dir,
    startDate: tableParams.start_date,
    endDate: tableParams.end_date,
    dateField,
  });

  return {
    items: res.data.items,
    total: res.data.total,
    page: res.data.page,
    limit: res.data.limit,
    totalPages: res.data.totalPages,
  };
}

export function useCategoryServerTable(
  activeBusinessId: string | null,
  dateField?: ListCategoriesParams['dateField'],
) {
  return useServerTable<CategoryListItem>({
    queryKey: ['categories', activeBusinessId ?? '', dateField ?? ''],
    queryFn: async (tableParams: ServerTableParams) => {
      if (!activeBusinessId) {
        return {
          items: [],
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        };
      }

      return fetchCategoriesServerTable(
        activeBusinessId,
        tableParams,
        dateField,
      );
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
