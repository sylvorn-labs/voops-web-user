import { z } from 'zod';

export const partyFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Party name is required')
    .max(100, 'Party name must be less than 100 characters'),
  type: z.enum(['person', 'company'], {
    error: 'Please select party type',
  }),
  kind: z.enum(['customer', 'vendor', 'employee', 'other'], {
    error: 'Please select party kind',
  }),
  email: z.string().email('Invalid email address').or(z.literal('')).optional(),
  phone: z
    .string()
    .max(30, 'Phone number must be less than 30 characters')
    .optional(),
  is_archived: z.boolean(),
});
