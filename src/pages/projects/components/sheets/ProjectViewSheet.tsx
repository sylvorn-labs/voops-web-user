import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Edit02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import { getProjectByIdOptions } from '@/hooks/api/project.hook';
import { ProjectStatusBadge } from '@/pages/projects/list/components/project-status-badge/ProjectStatusBadge';
import { ProjectArchiveBadge } from '@/pages/projects/list/components/project-archive-badge/ProjectArchiveBadge';
import type { ViewSheetProps } from '@/types/sheet.d';

export function ProjectViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);

  const { data, isLoading, isError, refetch } = useQuery(
    getProjectByIdOptions(id),
  );

  const project = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !project) {
    return (
      <SheetErrorState
        message="Failed to load project details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/projects/${project.id}`);
  };

  const formattedCreatedAt = new Date(project.created_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(project.updated_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <SheetActionBar>
        <SheetActionBar.Button
          icon={Edit02Icon}
          label="Edit"
          variant="outline"
          onClick={() => switchMode('edit')}
        />
        <SheetActionBar.Button
          icon={ArrowRight01Icon}
          label="Full Details"
          variant="outline"
          onClick={handleOpenDetails}
        />
      </SheetActionBar>

      <SheetFieldGroup title="Project Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Project Name" value={project.name} />
          <SheetDetailRow
            label="Status"
            value={<ProjectStatusBadge status={project.status} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Archive Status"
            value={<ProjectArchiveBadge isArchived={project.is_archived} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Project ID" value={project.id} copyable />
          <SheetDetailRow
            label="Workspace ID"
            value={project.business_id}
            copyable
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Timeline">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Start Date"
            value={project.start_date || 'Not set'}
          />
          <SheetDetailRow
            label="End Date"
            value={project.end_date || 'Not set'}
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Audit Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Created At" value={formattedCreatedAt} />
          <SheetDetailRow label="Last Updated" value={formattedUpdatedAt} />
        </div>
      </SheetFieldGroup>
    </div>
  );
}
