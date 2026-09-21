import type { PartyKind } from '@/types/api/party.d';

export const PARTY_KIND_LABELS: Record<PartyKind, string> = {
  customer: 'Customer',
  vendor: 'Vendor',
  employee: 'Employee',
  other: 'Other',
};

export const PARTY_KIND_STYLES: Record<PartyKind, string> = {
  customer: 'border-brand-5/25 bg-brand-5/15 text-brand-5 hover:bg-brand-5/25',
  vendor:
    'border-brand-10/25 bg-brand-10/15 text-brand-10 hover:bg-brand-10/25',
  employee: 'border-brand-3/25 bg-brand-3/15 text-brand-3 hover:bg-brand-3/25',
  other: 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25',
};
