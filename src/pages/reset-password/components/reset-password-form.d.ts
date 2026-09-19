import type { z } from 'zod';
import type { resetPasswordSchema } from './reset-password-form.constants';

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
