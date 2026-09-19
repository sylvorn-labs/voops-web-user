import type { z } from 'zod';
import type { businessCreateSchema } from './business-create-form.schema';

export type BusinessCreateFormValues = z.infer<typeof businessCreateSchema>;

export interface BusinessCreateFormProps {
  onSuccess?: (businessId: string) => void;
}
