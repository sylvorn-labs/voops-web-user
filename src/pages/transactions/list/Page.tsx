import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MinusSignIcon,
  PlusSignIcon,
  TransactionIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useToggleArchiveTransaction } from '@/hooks/api/transaction.hook';
import type {
  TransactionListItem,
  TransactionType,
} from '@/types/api/transaction.d';

import { TransactionDeleteDialog } from '@/pages/transactions/components/transaction-delete-dialog/TransactionDeleteDialog';
import { getTransactionRowActions } from './transactions.actions';
import { getTransactionColumns } from './transactions.columns';
import {
  TRANSACTION_FILTERABLE_COLUMNS,
  TRANSACTION_SEARCHABLE_COLUMNS,
  getTransactionAsyncFilterableColumns,
} from './transactions.filters';
import { useTransactionServerTable } from './transactions.server-table';

export function TransactionListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveTransaction();

  const [transactionToDelete, setTransactionToDelete] =
    useState<TransactionListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Transactions' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddTransaction = (type: TransactionType = 'debit') => {
    const isCredit = type === 'credit';
    openSheet({
      sheetKey: 'transaction',
      mode: 'add',
      title: isCredit ? 'Add Credit (Income)' : 'Add Debit (Expense)',
      description: isCredit
        ? 'Record a new incoming financial transaction.'
        : 'Record a new outgoing expense transaction.',
      prefill: {
        type,
      },
    });
  };

  const rowActions = useMemo(
    () =>
      getTransactionRowActions({
        navigate,
        openSheet,
        onToggleArchive: transaction => {
          toggleArchiveMutation.mutate({
            id: transaction.id,
            is_archived: !transaction.is_archived,
          });
        },
        onDeleteTransaction: transaction => {
          setTransactionToDelete(transaction);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet, toggleArchiveMutation],
  );

  const columns = useMemo(
    () => getTransactionColumns(rowActions),
    [rowActions],
  );

  const asyncFilterableColumns = useMemo(
    () => getTransactionAsyncFilterableColumns(activeBusinessId),
    [activeBusinessId],
  );

  const table = useTransactionServerTable(activeBusinessId);

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={TransactionIcon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view transactions."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Transactions',
          description:
            'Record, monitor, and categorize financial cash flow and journal entries.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                className="bg-emerald-700 text-white hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                onClick={() => handleAddTransaction('credit')}
              >
                <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
                Credit
              </Button>
              <Button
                className="bg-rose-700 text-white hover:bg-rose-600 dark:bg-rose-700 dark:hover:bg-rose-600"
                onClick={() => handleAddTransaction('debit')}
              >
                <HugeiconsIcon icon={MinusSignIcon} className="mr-1 size-4" />
                Debit
              </Button>
            </div>
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
          errorTitle: 'Failed to load transactions',
          errorDescription: table.error?.message,
          searchableColumns: TRANSACTION_SEARCHABLE_COLUMNS,
          filterableColumns: TRANSACTION_FILTERABLE_COLUMNS,
          asyncFilterableColumns,
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
          onRowClick: transaction =>
            openSheet({
              sheetKey: 'transaction',
              mode: 'view',
              id: transaction.id,
              title: transaction.description || 'Transaction Details',
              description: 'Transaction Overview',
            }),
          emptyTitle: 'No transactions found',
          emptyDescription:
            'Record your first income or expense transaction to get started.',
          emptyActionLabel: 'Add Debit',
          onEmptyAction: () => handleAddTransaction('debit'),
        }}
      />

      <TransactionDeleteDialog
        transaction={transactionToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
