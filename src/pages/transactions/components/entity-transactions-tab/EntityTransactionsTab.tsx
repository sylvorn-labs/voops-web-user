import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ViewIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { DataTable } from '@/components/dashboard/data-table/DataTable';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { useServerTable } from '@/components/dashboard/data-table/use-server-table';
import type {
  ServerTableParams,
  RowActionConfig,
} from '@/components/dashboard/data-table/types';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { TransactionAPI } from '@/api/transaction.api';
import type {
  TransactionListItem,
  ListTransactionsParams,
  TransactionType,
  TransactionSortBy,
} from '@/types/api/transaction.d';

import { getTransactionColumns } from '../../list/transactions.columns';
import {
  TRANSACTION_FILTERABLE_COLUMNS,
  TRANSACTION_SEARCHABLE_COLUMNS,
  getTransactionAsyncFilterableColumns,
} from '../../list/transactions.filters';
import type { EntityTransactionsTabProps } from './entity-transactions-tab.d';

export function EntityTransactionsTab({
  entityType,
  entityId,
}: EntityTransactionsTabProps) {
  const navigate = useNavigate();
  const activeBusinessId = useActiveBusinessId();
  const openSheet = useSheetOpen();

  const viewActions: RowActionConfig<TransactionListItem>[] = useMemo(
    () => [
      {
        id: 'quick-view',
        label: 'Quick View',
        icon: ViewIcon,
        separatorBefore: false,
        onClick: (transaction: TransactionListItem) => {
          openSheet({
            sheetKey: 'transaction',
            mode: 'view',
            id: transaction.id,
            title: transaction.description || 'Transaction Details',
            description: 'Transaction Overview',
          });
        },
      },
      {
        id: 'view-details',
        label: 'View Details',
        icon: ArrowRight01Icon,
        separatorBefore: false,
        onClick: (transaction: TransactionListItem) => {
          navigate(`/dashboard/transactions/${transaction.id}`);
        },
      },
    ],
    [navigate, openSheet],
  );

  const columns = useMemo(
    () => getTransactionColumns(viewActions),
    [viewActions],
  );

  const asyncFilterableColumns = useMemo(() => {
    const all = getTransactionAsyncFilterableColumns(activeBusinessId);
    // Filter out the current entity column if it's already the parent filter
    const filterKeyMap: Record<string, string> = {
      category: 'category_id',
      account: 'account_id',
      project: 'project_id',
      party: 'party_id',
    };
    const excludeKey = filterKeyMap[entityType];
    return all.filter(col => col.id !== excludeKey);
  }, [activeBusinessId, entityType]);

  const table = useServerTable<TransactionListItem>({
    queryKey: [
      'transactions',
      activeBusinessId ?? '',
      'entity',
      entityType,
      entityId,
    ],
    preserveKeys: ['tab'],
    queryOptions: {
      enabled: Boolean(activeBusinessId && entityId),
    },
    queryFn: async (tableParams: ServerTableParams) => {
      if (!activeBusinessId || !entityId) {
        return {
          items: [],
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
        };
      }

      let isArchived: boolean | undefined;
      if (tableParams.filters?.is_archived?.[0] !== undefined) {
        isArchived = tableParams.filters.is_archived[0] === 'true';
      }

      const params: ListTransactionsParams = {
        business_id: activeBusinessId,
        page: tableParams.page,
        limit: tableParams.limit,
        search: tableParams.q,
        type: tableParams.filters?.type?.[0] as TransactionType | undefined,
        is_archived: isArchived,
        sortBy: tableParams.sort_by as TransactionSortBy | undefined,
        sortOrder: tableParams.sort_dir,
        startDate: tableParams.start_date,
        endDate: tableParams.end_date,
      };

      if (entityType === 'category') {
        params.category_id = entityId;
      } else if (entityType === 'account') {
        params.account_id = entityId;
      } else if (entityType === 'project') {
        params.project_id = entityId;
      } else if (entityType === 'party') {
        params.party_id = entityId;
      }

      // Add other filters from tableParams if any
      if (
        entityType !== 'category' &&
        tableParams.filters?.category_id?.length
      ) {
        params.category_id = tableParams.filters.category_id;
      }
      if (entityType !== 'account' && tableParams.filters?.account_id?.length) {
        params.account_id = tableParams.filters.account_id;
      }
      if (entityType !== 'project' && tableParams.filters?.project_id?.length) {
        params.project_id = tableParams.filters.project_id;
      }
      if (entityType !== 'party' && tableParams.filters?.party_id?.length) {
        params.party_id = tableParams.filters.party_id;
      }

      const res = await TransactionAPI.getInstance().list(params);

      return {
        items: res.data.items,
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
      };
    },
  });

  return (
    <DataTable
      mode="server"
      columns={columns}
      data={table.data}
      totalRows={table.totalRows}
      isLoading={table.isLoading}
      isFetching={table.isFetching}
      isError={table.isError}
      errorTitle="Failed to load transactions"
      errorDescription={table.error?.message}
      searchableColumns={TRANSACTION_SEARCHABLE_COLUMNS}
      filterableColumns={TRANSACTION_FILTERABLE_COLUMNS}
      asyncFilterableColumns={asyncFilterableColumns}
      currentSearch={table.params.q}
      onSearchChange={table.onSearchChange}
      currentPage={table.params.page}
      onPageChange={table.onPageChange}
      currentPageSize={table.params.limit}
      onPageSizeChange={table.onPageSizeChange}
      currentSortBy={table.params.sort_by}
      currentSortDir={table.params.sort_dir}
      onSortChange={table.onSortChange}
      currentFilters={table.params.filters}
      onFilterChange={table.onFilterChange}
      onReset={table.onReset}
      renderRowContextMenu={row => (
        <DataTableRowContextMenuContent row={row} actions={viewActions} />
      )}
      onRowClick={transaction =>
        openSheet({
          sheetKey: 'transaction',
          mode: 'view',
          id: transaction.id,
          title: transaction.description || 'Transaction Details',
          description: 'Transaction Overview',
        })
      }
      emptyTitle="No transactions found"
      emptyDescription="No transactions recorded for this entity."
    />
  );
}
