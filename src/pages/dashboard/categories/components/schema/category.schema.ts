import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(100, 'Name must not exceed 100 characters'),
  kind: z.enum(['income', 'expense', 'both'], {
    error: 'Please select a valid type',
  }),
  color: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a valid hex color')
    .optional()
    .or(z.literal('')),
});
