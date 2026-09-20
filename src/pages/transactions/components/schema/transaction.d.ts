import type { z } from 'zod';
import type {
  transactionEditFormSchema,
  transactionFormSchema,
} from './transaction.schema';

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
export type TransactionEditFormValues = z.infer<
  typeof transactionEditFormSchema
>;
