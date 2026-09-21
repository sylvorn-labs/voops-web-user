import type { z } from 'zod';
import type { categoryFormSchema } from './category.schema';

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
