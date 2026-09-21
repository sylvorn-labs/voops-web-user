import type { ProjectStatus } from '@/types/api/project.d';
import type { ProjectFormValues } from './project.d';

export const PROJECT_STATUS_OPTIONS: {
  value: ProjectStatus;
  label: string;
}[] = [
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'archived', label: 'Archived' },
];

export const PROJECT_FORM_DEFAULT_VALUES: ProjectFormValues = {
  name: '',
  status: 'active',
  start_date: '',
  end_date: '',
  is_archived: false,
};
