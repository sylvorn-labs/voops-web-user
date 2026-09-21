import type { z } from 'zod';
import type { accountFormSchema } from './account.schema';

export type AccountFormValues = z.infer<typeof accountFormSchema>;
