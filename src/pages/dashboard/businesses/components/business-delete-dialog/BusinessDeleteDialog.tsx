import { useState } from 'react';
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
  const [isPermanent, setIsPermanent] = useState(false);
  const deleteBusiness = useDeleteBusiness();
  const activeBusinessId = useActiveBusinessId();
  const resetActiveBusinessId = useResetActiveBusinessId();

  if (!business) return null;

  const handleDelete = () => {
    deleteBusiness.mutate(
      { id: business.id, hard: isPermanent },
      {
        onSuccess: () => {
          if (activeBusinessId === business.id) {
            resetActiveBusinessId();
          }
          onOpenChange(false);
          setIsPermanent(false);
          onSuccess?.();
        },
      },
    );
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) setIsPermanent(false);
        onOpenChange(isOpen);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Business Workspace</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <strong className="text-foreground">{business.name}</strong>? Only
            the workspace owner can perform this operation.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-muted/50 rounded-lg p-3 text-xs">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={isPermanent}
              onChange={e => setIsPermanent(e.target.checked)}
              className="text-destructive focus:ring-destructive mt-0.5 rounded border-gray-300"
              disabled={deleteBusiness.isPending}
            />
            <div>
              <span className="text-foreground font-semibold">
                Permanent Deletion (Hard Delete)
              </span>
              <p className="text-muted-foreground mt-0.5">
                If checked, this will permanently remove this business along
                with all its transactions, accounts, categories, projects, and
                member associations. If unchecked, the business will be
                soft-deleted.
              </p>
            </div>
          </label>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteBusiness.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteBusiness.isPending}
          >
            {deleteBusiness.isPending
              ? 'Deleting...'
              : isPermanent
                ? 'Permanently Delete'
                : 'Delete Business'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
