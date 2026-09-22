import { MemberAPI } from '@/api/member.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  ListMembersParams,
  MemberListItem,
  MemberRole,
  MemberSortBy,
} from '@/types/api/member.d';

export async function fetchMembersServerTable(
  businessId: string,
  tableParams: ServerTableParams,
  dateField?: ListMembersParams['dateField'],
) {
  const res = await MemberAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    role: tableParams.filters?.role?.[0] as MemberRole | undefined,
    sortBy: tableParams.sort_by as MemberSortBy | undefined,
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

export function useMemberServerTable(
  activeBusinessId: string | null,
  dateField?: ListMembersParams['dateField'],
) {
  return useServerTable<MemberListItem>({
    queryKey: ['members', activeBusinessId ?? '', dateField ?? ''],
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

      return fetchMembersServerTable(activeBusinessId, tableParams, dateField);
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
