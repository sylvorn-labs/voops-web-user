import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Folder02Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { ListingLayout } from '@/layouts/dashboard-list/ListingLayout';
import { DataTableRowContextMenuContent } from '@/components/dashboard/data-table/data-table-row-context-menu';
import { Button } from '@/components/ui/button/Button';
import { Empty } from '@/components/global/Empty';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useToggleArchiveProject } from '@/hooks/api/project.hook';
import type { ProjectListItem } from '@/types/api/project.d';

import { ProjectDeleteDialog } from '@/pages/projects/components/project-delete-dialog/ProjectDeleteDialog';
import { getProjectRowActions } from './projects.actions';
import { getProjectColumns } from './projects.columns';
import {
  PROJECT_FILTERABLE_COLUMNS,
  PROJECT_SEARCHABLE_COLUMNS,
} from './projects.filters';
import { useProjectServerTable } from './projects.server-table';

export function ProjectListPage() {
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveProject();

  const [projectToDelete, setProjectToDelete] =
    useState<ProjectListItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Projects' },
    ]);
  }, [setBreadcrumbs]);

  const handleAddProject = () => {
    openSheet({
      sheetKey: 'project',
      mode: 'add',
      title: 'Add Project',
      description: 'Create a new project to organize tasks and finances.',
    });
  };

  const rowActions = useMemo(
    () =>
      getProjectRowActions({
        navigate,
        openSheet,
        onToggleArchive: project => {
          toggleArchiveMutation.mutate({
            id: project.id,
            is_archived: !project.is_archived,
          });
        },
        onDeleteProject: project => {
          setProjectToDelete(project);
          setIsDeleteDialogOpen(true);
        },
      }),
    [navigate, openSheet, toggleArchiveMutation],
  );

  const columns = useMemo(() => getProjectColumns(rowActions), [rowActions]);

  const table = useProjectServerTable(activeBusinessId);

  if (!activeBusinessId) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Empty
          icon={Folder02Icon}
          title="No business selected"
          description="Please select or create a business workspace from the sidebar to view projects."
        />
      </div>
    );
  }

  return (
    <>
      <ListingLayout
        header={{
          title: 'Projects',
          description:
            'Manage and track project timelines, statuses, and performance.',
          opposite: (
            <Button onClick={handleAddProject}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-4" />
              Add Project
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
          errorTitle: 'Failed to load projects',
          errorDescription: table.error?.message,
          searchableColumns: PROJECT_SEARCHABLE_COLUMNS,
          filterableColumns: PROJECT_FILTERABLE_COLUMNS,
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
          onRowClick: project =>
            openSheet({
              sheetKey: 'project',
              mode: 'view',
              id: project.id,
              title: project.name,
              description: 'Project Information',
            }),
          emptyTitle: 'No projects found',
          emptyDescription:
            'Create your first project to start organizing initiatives and tracking transactions.',
          emptyActionLabel: 'Add Project',
          onEmptyAction: handleAddProject,
        }}
      />

      <ProjectDeleteDialog
        project={projectToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </>
  );
}
