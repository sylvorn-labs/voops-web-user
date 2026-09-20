import type { TransactionListItem } from '@/types/api/transaction.d';

export interface TransactionDeleteDialogProps {
  transaction: TransactionListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
