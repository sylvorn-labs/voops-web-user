import type { NavigateFunction } from 'react-router';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';

import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { ProjectListItem } from '@/types/api/project.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface ProjectRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onToggleArchive: (project: ProjectListItem) => void;
  onDeleteProject: (project: ProjectListItem) => void;
}

export function getProjectRowActions({
  navigate,
  openSheet,
  onToggleArchive,
  onDeleteProject,
}: ProjectRowActionsOptions): RowActionConfig<ProjectListItem>[] {
  return [
    // ─── Group 1: View Actions ──────────────────────────────────────────────
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: project => {
        openSheet({
          sheetKey: 'project',
          mode: 'view',
          id: project.id,
          title: project.name,
          description: 'Project Information',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: project => {
        navigate(`/dashboard/projects/${project.id}`);
      },
    },

    // ─── Group 2: Edit & Archive Actions ────────────────────────────────────
    {
      id: 'edit',
      label: 'Edit project',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: project => {
        openSheet({
          sheetKey: 'project',
          mode: 'edit',
          id: project.id,
          title: 'Edit Project',
          description: 'Update project details and timeline.',
        });
      },
    },
    {
      id: 'toggle-archive',
      label: project =>
        project.is_archived ? 'Restore project' : 'Archive project',
      icon: project =>
        project.is_archived ? ArchiveRestoreIcon : Archive02Icon,
      separatorBefore: false,
      onClick: project => {
        onToggleArchive(project);
      },
    },

    // ─── Group 3: Delete Action ─────────────────────────────────────────────
    {
      id: 'delete',
      label: 'Delete project',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: project => {
        onDeleteProject(project);
      },
    },
  ];
}
