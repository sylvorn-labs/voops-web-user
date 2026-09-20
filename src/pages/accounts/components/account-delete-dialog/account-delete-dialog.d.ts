import type { Account, AccountListItem } from '@/types/api/account.d';

export interface AccountDeleteDialogProps {
  account: Account | AccountListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
