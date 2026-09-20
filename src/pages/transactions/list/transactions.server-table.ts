import { TransactionAPI } from '@/api/transaction.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  TransactionListItem,
  TransactionSortBy,
  TransactionType,
} from '@/types/api/transaction.d';

export async function fetchTransactionsServerTable(
  businessId: string,
  tableParams: ServerTableParams,
) {
  let isArchived: boolean | undefined;
  if (tableParams.filters?.is_archived?.[0] !== undefined) {
    isArchived = tableParams.filters.is_archived[0] === 'true';
  }

  const res = await TransactionAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    type: tableParams.filters?.type as TransactionType[] | undefined,
    account_id: tableParams.filters?.account_id,
    category_id: tableParams.filters?.category_id,
    project_id: tableParams.filters?.project_id,
    party_id: tableParams.filters?.party_id,
    is_archived: isArchived,
    sortBy: tableParams.sort_by as TransactionSortBy | undefined,
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
}

export function useTransactionServerTable(activeBusinessId: string | null) {
  return useServerTable<TransactionListItem>({
    queryKey: ['transactions', activeBusinessId ?? ''],
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

      return fetchTransactionsServerTable(activeBusinessId, tableParams);
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
