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
import { useDeleteBusiness } from '@/hooks/api/business.hook';
import {
  useActiveBusinessId,
  useResetActiveBusinessId,
} from '@/stores/business/business.selectors';
import type { BusinessDeleteDialogProps } from './business-delete-dialog.d';

export function BusinessDeleteDialog({
  business,
  open,
  onOpenChange,
  onSuccess,
}: BusinessDeleteDialogProps) {
  const deleteBusiness = useDeleteBusiness();
  const activeBusinessId = useActiveBusinessId();
  const resetActiveBusinessId = useResetActiveBusinessId();

  if (!business) return null;

  const handleDelete = () => {
    deleteBusiness.mutate(business.id, {
      onSuccess: () => {
        if (activeBusinessId === business.id) {
          resetActiveBusinessId();
        }
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Business</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <strong className="text-foreground">{business.name}</strong>? This
            action will remove the business workspace and archive its associated
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteBusiness.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteBusiness.isPending}
          >
            {deleteBusiness.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
