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

// ─── Types ────────────────────────────────────────────────────────────────────

interface SheetDeleteDialogProps {
  open: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  /** @default "Delete?" */
  title?: string;
  /** @default "This action is permanent and cannot be undone." */
  description?: string;
  /** @default "Delete" */
  confirmLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `SheetDeleteDialog`
 *
 * A generic destructive confirmation `AlertDialog` used by View sheets before
 * executing a permanent delete mutation. Replaces the three identical local
 * `DeleteDialog` components previously defined in `AdminViewSheet`,
 * `InquiryViewSheet`, and `SubscriberViewSheet`.
 *
 * ### Usage
 * ```tsx
 * <SheetDeleteDialog
 *   open={showDeleteDialog}
 *   isPending={deleteMutation.isPending}
 *   onConfirm={() => deleteMutation.mutate()}
 *   onCancel={() => setShowDeleteDialog(false)}
 *   title="Delete subscriber?"
 *   description="This will permanently remove the subscriber and all associated data. This action cannot be undone."
 * />
 * ```
 *
 * The dialog closes itself whenever `open` becomes `false` via `onOpenChange`,
 * which also fires when the user presses Escape or clicks the overlay — both
 * are forwarded to `onCancel` so the parent can reset its local open state.
 */
export function SheetDeleteDialog({
  open,
  isPending,
  onConfirm,
  onCancel,
  title = 'Delete?',
  description = 'This action is permanent and cannot be undone.',
  confirmLabel = 'Delete',
}: SheetDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={o => !o && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? 'Deleting…' : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
