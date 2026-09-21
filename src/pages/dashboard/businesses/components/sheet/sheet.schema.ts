import { z } from 'zod';

export const businessFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Business name must be at least 2 characters.' }),
  currency_code: z.string().min(1, { message: 'Please select a currency.' }),
  opening_balance: z
    .number()
    .min(0, { message: 'Opening balance must be at least 0.' }),
  current_balance: z
    .number()
    .min(0, { message: 'Current balance must be at least 0.' })
    .optional(),
});
