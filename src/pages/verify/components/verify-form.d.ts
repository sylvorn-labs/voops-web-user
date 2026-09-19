import type { z } from 'zod';
import type { emailSchema } from './verify-form.constants';

export type EmailFormValues = z.infer<typeof emailSchema>;
