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
import { useDeleteTransaction } from '@/hooks/api/transaction.hook';
import type { TransactionDeleteDialogProps } from './transaction-delete-dialog.d';

export function TransactionDeleteDialog({
  transaction,
  open,
  onOpenChange,
  onSuccess,
}: TransactionDeleteDialogProps) {
  const deleteMutation = useDeleteTransaction();

  const handleDelete = () => {
    if (!transaction) return;

    deleteMutation.mutate(transaction.id, {
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
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction{' '}
            {transaction?.description ? (
              <span className="text-foreground font-semibold">
                &quot;{transaction.description}&quot;
              </span>
            ) : (
              <span className="text-foreground font-semibold">
                (ID: {transaction?.id.slice(0, 8)}...)
              </span>
            )}
            ? This action will remove the record from your workspace.
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
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Transaction'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
