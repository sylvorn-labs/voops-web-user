import { ProjectAPI } from '@/api/project.api';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type { ServerTableParams } from '@/components/dashboard/data-table/types';
import type {
  ListProjectsParams,
  ProjectListItem,
  ProjectSortBy,
  ProjectStatus,
} from '@/types/api/project.d';

export async function fetchProjectsServerTable(
  businessId: string,
  tableParams: ServerTableParams,
  dateField?: ListProjectsParams['dateField'],
) {
  let isArchived: boolean | undefined;
  if (tableParams.filters?.is_archived?.[0] !== undefined) {
    isArchived = tableParams.filters.is_archived[0] === 'true';
  }

  const res = await ProjectAPI.getInstance().list({
    business_id: businessId,
    page: tableParams.page,
    limit: tableParams.limit,
    search: tableParams.q,
    status: tableParams.filters?.status?.[0] as ProjectStatus | undefined,
    is_archived: isArchived,
    sortBy: tableParams.sort_by as ProjectSortBy | undefined,
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

export function useProjectServerTable(
  activeBusinessId: string | null,
  dateField?: ListProjectsParams['dateField'],
) {
  return useServerTable<ProjectListItem>({
    queryKey: ['projects', activeBusinessId ?? '', dateField ?? ''],
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

      return fetchProjectsServerTable(activeBusinessId, tableParams, dateField);
    },
    queryOptions: {
      enabled: Boolean(activeBusinessId),
    },
  });
}
