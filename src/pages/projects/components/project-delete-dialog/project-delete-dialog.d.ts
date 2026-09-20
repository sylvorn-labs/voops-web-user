import type { Project, ProjectListItem } from '@/types/api/project.d';

export interface ProjectDeleteDialogProps {
  project: Project | ProjectListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
