import { AccountAPI } from '@/api/account.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  AccountListItem,
  AccountKind,
  AccountSortBy,
  ListAccountsParams,
} from '@/types/api/account.d';

export async function fetchAccountsServerTable(
  businessId: string,
  tableParams: ServerTableParams,
  dateField?: ListAccountsParams['dateField'],
) {
  let isArchived: boolean | undefined;
  if (tableParams.filters?.is_archived?.[0] !== undefined) {
    isArchived = tableParams.filters.is_archived[0] === 'true';
  }

  const res = await AccountAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    kind: tableParams.filters?.kind?.[0] as AccountKind | undefined,
    is_archived: isArchived,
    sortBy: tableParams.sort_by as AccountSortBy | undefined,
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

export function useAccountServerTable(
  activeBusinessId: string | null,
  dateField?: ListAccountsParams['dateField'],
) {
  return useServerTable<AccountListItem>({
    queryKey: ['accounts', activeBusinessId ?? '', dateField ?? ''],
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

      return fetchAccountsServerTable(activeBusinessId, tableParams, dateField);
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
