import { z } from 'zod';

export const businessCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Business name must be at least 2 characters.' }),
  currency_code: z.string().min(1, { message: 'Please select a currency.' }),
});
