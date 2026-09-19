import type { z } from 'zod';
import type { forgotPasswordSchema } from './forgot-password-form.schema';

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
