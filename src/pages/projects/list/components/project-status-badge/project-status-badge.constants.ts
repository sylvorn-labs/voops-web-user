import type { ProjectStatus } from '@/types/api/project.d';

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  on_hold: 'On Hold',
  archived: 'Archived',
};

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  active: 'border-brand-7/25 bg-brand-7/15 text-brand-7 hover:bg-brand-7/25',
  completed: 'border-brand-5/25 bg-brand-5/15 text-brand-5 hover:bg-brand-5/25',
  on_hold:
    'border-brand-10/25 bg-brand-10/15 text-brand-10 hover:bg-brand-10/25',
  archived: 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25',
};
