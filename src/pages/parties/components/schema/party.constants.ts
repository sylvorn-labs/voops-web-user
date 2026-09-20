import type { PartyFormValues } from './party.d';

export const PARTY_KIND_OPTIONS = [
  { label: 'Customer', value: 'customer' },
  { label: 'Vendor / Supplier', value: 'vendor' },
  { label: 'Employee', value: 'employee' },
  { label: 'Other', value: 'other' },
] as const;

export const PARTY_FORM_DEFAULT_VALUES: PartyFormValues = {
  name: '',
  kind: 'customer',
  email: '',
  phone: '',
  is_archived: false,
};
