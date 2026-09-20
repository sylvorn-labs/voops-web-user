import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog/AlertDialog';
import { useDeleteProject } from '@/hooks/api/project.hook';
import type { ProjectDeleteDialogProps } from './project-delete-dialog.d';

export function ProjectDeleteDialog({
  project,
  open,
  onOpenChange,
  onSuccess,
}: ProjectDeleteDialogProps) {
  const deleteMutation = useDeleteProject();

  const handleDelete = () => {
    if (!project) return;

    deleteMutation.mutate(project.id, {
      onSuccess: () => {
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <strong className="text-foreground">{project?.name}</strong>? This
            will mark the project as deleted. You can restore it later if
            needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Project'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
