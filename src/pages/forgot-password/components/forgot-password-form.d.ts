import type { z } from 'zod';
import type { forgotPasswordSchema } from './forgot-password-form.constants';

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
