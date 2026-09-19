import type { z } from 'zod';
import type { categoryFormSchema } from './sheet.schema';

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
