import type { z } from 'zod';
import type { projectFormSchema } from './project.schema';

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
