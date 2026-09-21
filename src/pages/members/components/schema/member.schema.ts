import { z } from 'zod';

export const memberFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  role: z.enum(['owner', 'admin', 'member', 'viewer'], {
    error: 'Please select a valid role',
  }),
});

export const memberEditFormSchema = z.object({
  role: z.enum(['owner', 'admin', 'member', 'viewer'], {
    error: 'Please select a valid role',
  }),
});

export type MemberEditFormValues = z.infer<typeof memberEditFormSchema>;
