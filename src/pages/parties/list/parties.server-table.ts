import { PartyAPI } from '@/api/party.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  ListPartiesParams,
  PartyKind,
  PartyListItem,
  PartySortBy,
  PartyType,
} from '@/types/api/party.d';

export async function fetchPartiesServerTable(
  businessId: string,
  tableParams: ServerTableParams,
  dateField?: ListPartiesParams['dateField'],
) {
  let isArchived: boolean | undefined;
  if (tableParams.filters?.is_archived?.[0] !== undefined) {
    isArchived = tableParams.filters.is_archived[0] === 'true';
  }

  const res = await PartyAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    type: tableParams.filters?.type?.[0] as PartyType | undefined,
    kind: tableParams.filters?.kind?.[0] as PartyKind | undefined,
    is_archived: isArchived,
    sortBy: tableParams.sort_by as PartySortBy | undefined,
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

export function usePartyServerTable(
  activeBusinessId: string | null,
  dateField?: ListPartiesParams['dateField'],
) {
  return useServerTable<PartyListItem>({
    queryKey: ['parties', activeBusinessId ?? '', dateField ?? ''],
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

      return fetchPartiesServerTable(activeBusinessId, tableParams, dateField);
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
