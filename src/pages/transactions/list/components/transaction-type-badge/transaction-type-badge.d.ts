import type { TransactionType } from '@/types/api/transaction.d';

export interface TransactionTypeBadgeProps {
  type: TransactionType;
  className?: string;
}
