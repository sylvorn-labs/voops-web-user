import { z } from 'zod';

export const accountFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Account name is required')
    .max(100, 'Account name must not exceed 100 characters'),
  kind: z.enum(['cash', 'bank', 'card', 'wallet', 'other'], {
    error: 'Please select a valid account type',
  }),
  opening_balance: z
    .number({
      error: 'Opening balance must be a number',
    })
    .min(0, 'Opening balance cannot be negative'),
  is_archived: z.boolean(),
});
