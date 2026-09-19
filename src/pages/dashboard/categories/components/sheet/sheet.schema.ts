import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Category name must be at least 2 characters.' })
    .max(50, { message: 'Category name must not exceed 50 characters.' }),
  kind: z.enum(['income', 'expense', 'both'], {
    error: 'Please select a valid category type.',
  }),
  color: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
      message: 'Color must be a valid hex code (e.g. #3B82F6).',
    })
    .or(z.literal(''))
    .optional(),
});

export type CategoryFormSchema = typeof categoryFormSchema;
