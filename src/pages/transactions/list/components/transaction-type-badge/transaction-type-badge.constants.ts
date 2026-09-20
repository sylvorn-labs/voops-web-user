import type { TransactionType } from '@/types/api/transaction.d';

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  debit: 'Expense',
  credit: 'Income',
};

export const TRANSACTION_TYPE_STYLES: Record<TransactionType, string> = {
  debit:
    'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/30',
  credit:
    'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30',
};
