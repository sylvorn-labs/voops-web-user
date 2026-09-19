import type { z } from 'zod';
import type { Business } from '@/types/api/business.d';
import type { businessUpdateSchema } from './business-update-form.schema';

export type BusinessUpdateFormValues = z.infer<typeof businessUpdateSchema>;

export interface BusinessUpdateFormProps {
  business: Business;
  onSuccess?: () => void;
}
