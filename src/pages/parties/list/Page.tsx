import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PlusSignIcon, UserGroupIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useToggleArchiveParty } from '@/hooks/api/party.hook';
import type { PartyListItem } from '@/types/api/party.d';

import { PartyDeleteDialog } from '@/pages/parties/components/party-delete-dialog/PartyDeleteDialog';
import { getPartyRowActions } from './parties.actions';
import { getPartyColumns } from './parties.columns';
import {
  PARTY_FILTERABLE_COLUMNS,
  PARTY_SEARCHABLE_COLUMNS,
} from './parties.filters';
import { usePartyServerTable } from './parties.server-table';

export function PartyListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveParty();

  const [partyToDelete, setPartyToDelete] = useState<PartyListItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Parties' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddParty = () => {
    openSheet({
      sheetKey: 'party',
      mode: 'add',
      title: 'Add Party',
      description: 'Create a new customer, vendor, employee, or contact.',
    });
  };

  const rowActions = useMemo(
    () =>
      getPartyRowActions({
        navigate,
        openSheet,
        onToggleArchive: party => {
          toggleArchiveMutation.mutate({
            id: party.id,
            is_archived: !party.is_archived,
          });
        },
        onDeleteParty: party => {
          setPartyToDelete(party);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet, toggleArchiveMutation],
  );

  const columns = useMemo(() => getPartyColumns(rowActions), [rowActions]);

  const table = usePartyServerTable(activeBusinessId);

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={UserGroupIcon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view parties."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Parties',
          description:
            'Manage and track customers, vendors, suppliers, and contacts.',
          opposite: (
            <Button onClick={handleAddParty}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
              Add Party
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
          errorTitle: 'Failed to load parties',
          errorDescription: table.error?.message,
          searchableColumns: PARTY_SEARCHABLE_COLUMNS,
          filterableColumns: PARTY_FILTERABLE_COLUMNS,
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
          onRowClick: party =>
            openSheet({
              sheetKey: 'party',
              mode: 'view',
              id: party.id,
              title: party.name,
              description: 'Party Information',
            }),
          emptyTitle: 'No parties found',
          emptyDescription:
            'Create your first customer, vendor, or contact to get started.',
          emptyActionLabel: 'Add Party',
          onEmptyAction: handleAddParty,
        }}
      />

      <PartyDeleteDialog
        party={partyToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
