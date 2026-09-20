import { z } from 'zod';

export const projectFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Project name is required')
      .max(100, 'Project name must not exceed 100 characters'),
    status: z.enum(['active', 'completed', 'on_hold', 'archived'], {
      error: 'Please select a valid project status',
    }),
    start_date: z.string().optional().or(z.literal('')),
    end_date: z.string().optional().or(z.literal('')),
    is_archived: z.boolean(),
  })
  .refine(
    data => {
      if (data.start_date && data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: 'End date must be on or after start date',
      path: ['end_date'],
    },
  );
