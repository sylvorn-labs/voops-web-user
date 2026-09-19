import type { z } from 'zod';
import type { emailSchema } from './verify-form.schema';

export type EmailFormValues = z.infer<typeof emailSchema>;
