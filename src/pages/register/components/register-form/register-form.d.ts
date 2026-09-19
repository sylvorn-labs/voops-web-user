import type { z } from 'zod';
import type { registerSchema } from './register-form.schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;
