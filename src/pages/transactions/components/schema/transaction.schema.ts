import { z } from 'zod';

export const transactionFormSchema = z.object({
  type: z.enum(['debit', 'credit'], {
    error: 'Please select a transaction type',
  }),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  occurred_on: z.string().min(1, 'Transaction date is required'),
  account_id: z.string().min(1, 'Please select an account'),
  category_id: z.string().optional().or(z.literal('')),
  project_id: z.string().optional().or(z.literal('')),
  party_id: z.string().optional().or(z.literal('')),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
  is_archived: z.boolean(),
});

export const transactionEditFormSchema = transactionFormSchema;
