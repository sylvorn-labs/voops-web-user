import type { z } from 'zod';
import type { memberFormSchema } from './member.schema';

export type MemberFormValues = z.infer<typeof memberFormSchema>;
