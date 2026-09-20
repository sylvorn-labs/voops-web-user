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
import { useDeleteMember } from '@/hooks/api/member.hook';
import type { MemberDeleteDialogProps } from './member-delete-dialog.d';

export function MemberDeleteDialog({
  member,
  open,
  onOpenChange,
  onSuccess,
}: MemberDeleteDialogProps) {
  const deleteMutation = useDeleteMember();

  const handleDelete = () => {
    if (!member) return;

    deleteMutation.mutate(member.id, {
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
          <AlertDialogTitle>Remove Workspace Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this member (
            <span className="text-foreground font-semibold">
              {member?.email}
            </span>
            ) from the workspace? They will lose access immediately.
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
            {deleteMutation.isPending ? 'Removing...' : 'Remove Member'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
