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
import type { ListMembersParams, MemberListItem } from '@/types/api/member.d';

import { MemberDeleteDialog } from '@/pages/members/components/member-delete-dialog/MemberDeleteDialog';
import { getMemberRowActions } from './members.actions';
import { getMemberColumns } from './members.columns';
import {
  MEMBER_DATE_RANGE_COLUMNS,
  MEMBER_DEFAULT_DATE_FIELD,
  MEMBER_FILTERABLE_COLUMNS,
  MEMBER_SEARCHABLE_COLUMNS,
} from './members.filters';
import { useMemberServerTable } from './members.server-table';

export function MemberListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();

  const [memberToDelete, setMemberToDelete] = useState<MemberListItem | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dateField, setDateField] = useState<
    NonNullable<ListMembersParams['dateField']>
  >(MEMBER_DEFAULT_DATE_FIELD);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Members' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddMember = () => {
    openSheet({
      sheetKey: 'member',
      mode: 'add',
      title: 'Invite Member',
      description: 'Add a user to this workspace with assigned permissions.',
    });
  };

  const rowActions = useMemo(
    () =>
      getMemberRowActions({
        navigate,
        openSheet,
        onDeleteMember: member => {
          setMemberToDelete(member);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet],
  );

  const columns = useMemo(() => getMemberColumns(rowActions), [rowActions]);

  const table = useMemberServerTable(activeBusinessId, dateField);

  const handleReset = () => {
    setDateField(MEMBER_DEFAULT_DATE_FIELD);
    table.onReset();
  };

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={UserGroupIcon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view members."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Workspace Members',
          description:
            'Manage user access, roles, and permissions within this workspace.',
          opposite: (
            <Button onClick={handleAddMember}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
              Invite Member
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
          errorTitle: 'Failed to load members',
          errorDescription: table.error?.message,
          searchableColumns: MEMBER_SEARCHABLE_COLUMNS,
          filterableColumns: MEMBER_FILTERABLE_COLUMNS,
          dateRangeColumns: MEMBER_DATE_RANGE_COLUMNS,
          currentDateField: dateField,
          onDateFieldChange: value =>
            setDateField(value as NonNullable<ListMembersParams['dateField']>),
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
          onRowClick: member =>
            openSheet({
              sheetKey: 'member',
              mode: 'view',
              id: member.id,
              title: `Member: ${member.email}`,
              description: 'Workspace Member Details',
            }),
          emptyTitle: 'No members found',
          emptyDescription:
            'Invite team members to collaborate on this workspace.',
          emptyActionLabel: 'Invite Member',
          onEmptyAction: handleAddMember,
        }}
      />

      <MemberDeleteDialog
        member={memberToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
