import type { z } from 'zod';
import type { partyFormSchema } from './party.schema';

export type PartyFormValues = z.infer<typeof partyFormSchema>;
