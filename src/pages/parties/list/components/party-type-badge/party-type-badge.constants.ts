import type { PartyType } from '@/types/api/party.d';

export const PARTY_TYPE_LABELS: Record<PartyType, string> = {
  person: 'Person',
  company: 'Company',
};

export const PARTY_TYPE_STYLES: Record<PartyType, string> = {
  person:
    'border-blue-500/25 bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25',
  company:
    'border-purple-500/25 bg-purple-500/15 text-purple-600 dark:text-purple-400 hover:bg-purple-500/25',
};
