import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlusSignIcon, Wallet02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useToggleArchiveAccount } from '@/hooks/api/account.hook';
import type {
  AccountListItem,
  ListAccountsParams,
} from '@/types/api/account.d';

import { AccountDeleteDialog } from '@/pages/accounts/components/account-delete-dialog/AccountDeleteDialog';
import { getAccountRowActions } from './accounts.actions';
import { getAccountColumns } from './accounts.columns';
import {
  ACCOUNT_DATE_RANGE_COLUMNS,
  ACCOUNT_DEFAULT_DATE_FIELD,
  ACCOUNT_FILTERABLE_COLUMNS,
  ACCOUNT_SEARCHABLE_COLUMNS,
} from './accounts.filters';
import { useAccountServerTable } from './accounts.server-table';

export function AccountListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveAccount();

  const [accountToDelete, setAccountToDelete] =
    useState<AccountListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dateField, setDateField] = useState<
    NonNullable<ListAccountsParams['dateField']>
  >(ACCOUNT_DEFAULT_DATE_FIELD);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Accounts' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddAccount = () => {
    openSheet({
      sheetKey: 'account',
      mode: 'add',
      title: 'Add Account',
      description:
        'Create a financial account to track transactions and balances.',
    });
  };

  const rowActions = useMemo(
    () =>
      getAccountRowActions({
        navigate,
        openSheet,
        onToggleArchive: account => {
          toggleArchiveMutation.mutate({
            id: account.id,
            is_archived: !account.is_archived,
          });
        },
        onDeleteAccount: account => {
          setAccountToDelete(account);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet, toggleArchiveMutation],
  );

  const columns = useMemo(() => getAccountColumns(rowActions), [rowActions]);

  const table = useAccountServerTable(activeBusinessId, dateField);

  const handleReset = () => {
    setDateField(ACCOUNT_DEFAULT_DATE_FIELD);
    table.onReset();
  };

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={Wallet02Icon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view accounts."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Accounts',
          description:
            'Manage bank accounts, digital wallets, cash funds, and cards.',
          opposite: (
            <Button onClick={handleAddAccount}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
              Add Account
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
          errorTitle: 'Failed to load accounts',
          errorDescription: table.error?.message,
          searchableColumns: ACCOUNT_SEARCHABLE_COLUMNS,
          filterableColumns: ACCOUNT_FILTERABLE_COLUMNS,
          dateRangeColumns: ACCOUNT_DATE_RANGE_COLUMNS,
          currentDateField: dateField,
          onDateFieldChange: value =>
            setDateField(value as NonNullable<ListAccountsParams['dateField']>),
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
          onRowClick: account =>
            openSheet({
              sheetKey: 'account',
              mode: 'view',
              id: account.id,
              title: account.name,
              description: 'Account Information',
            }),
          emptyTitle: 'No accounts found',
          emptyDescription:
            'Set up your financial accounts to start recording transactions.',
          emptyActionLabel: 'Add Account',
          onEmptyAction: handleAddAccount,
        }}
      />

      <AccountDeleteDialog
        account={accountToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
