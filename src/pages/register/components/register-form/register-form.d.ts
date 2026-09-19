import type { z } from 'zod';
import type { registerSchema } from './register-form.constants';

export type RegisterFormValues = z.infer<typeof registerSchema>;
