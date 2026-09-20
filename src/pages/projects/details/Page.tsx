import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowLeft01Icon,
  Delete02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DetailsLayout } from '@/layouts/dashboard-detail/DetailsLayout';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import { Loading } from '@/components/global/Loading';
import { Error } from '@/components/global/Error';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import {
  getProjectByIdOptions,
  useToggleArchiveProject,
} from '@/hooks/api/project.hook';

import { ProjectDeleteDialog } from '@/pages/projects/components/project-delete-dialog/ProjectDeleteDialog';
import { ProjectBasicTab } from './components/project-basic-tab/ProjectBasicTab';

export function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveProject();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getProjectByIdOptions(id || ''),
  );

  const project = data?.data;

  useEffect(() => {
    if (project) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Projects', href: '/dashboard/projects' },
        { label: project.name },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Projects', href: '/dashboard/projects' },
      ]);
    }
  }, [project, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading project details..." />;
  }

  if (isError || !project) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Project not found"
          description="The requested project does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Projects',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/projects'),
          }}
          secondaryAction={{
            label: 'Try Again',
            icon: RefreshIcon,
            onClick: () => void refetch(),
          }}
        />
      </div>
    );
  }

  const handleEditInSheet = () => {
    openSheet({
      sheetKey: 'project',
      mode: 'edit',
      id: project.id,
      title: 'Edit Project',
      description: 'Update project configuration and timeline.',
    });
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({
      id: project.id,
      is_archived: !project.is_archived,
    });
  };

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <ProjectBasicTab project={project} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title: project.name,
          description: 'Project settings, timeline, and system metadata.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/projects')}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-1 size-4" />
                Back
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="size-8 p-0">
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      className="size-4"
                    />
                    <span className="sr-only">Open actions menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-fit min-w-[170px]"
                >
                  <DropdownMenuItem
                    onClick={handleEditInSheet}
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                    Edit project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleToggleArchive}
                    className="w-full"
                  >
                    <HugeiconsIcon
                      icon={
                        project.is_archived ? ArchiveRestoreIcon : Archive02Icon
                      }
                      className="size-4"
                    />
                    {project.is_archived
                      ? 'Restore project'
                      : 'Archive project'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Delete project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <ProjectDeleteDialog
        project={project}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/projects')}
      />
    </>
  );
}
