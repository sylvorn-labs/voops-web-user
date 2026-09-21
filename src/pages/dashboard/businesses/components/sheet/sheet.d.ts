import type { z } from 'zod';

import type { businessFormSchema } from './sheet.schema';

export type BusinessFormValues = z.infer<typeof businessFormSchema>;
