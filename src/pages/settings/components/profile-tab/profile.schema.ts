import { z } from 'zod';

export const profileDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name must not exceed 100 characters.' }),
  avatarUrl: z
    .string()
    .url({ message: 'Please enter a valid URL for avatar image.' })
    .or(z.literal(''))
    .optional(),
});

export const updateEmailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsSchema>;
export type UpdateEmailFormValues = z.infer<typeof updateEmailSchema>;
