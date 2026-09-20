import type { ProjectStatus } from '@/types/api/project.d';

export interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}
