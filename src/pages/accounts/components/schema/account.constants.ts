import type { AccountKind } from '@/types/api/account.d';
import type { AccountFormValues } from './account.d';

export const ACCOUNT_KIND_OPTIONS: { value: AccountKind; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank Account' },
  { value: 'card', label: 'Credit / Debit Card' },
  { value: 'wallet', label: 'Digital Wallet' },
  { value: 'other', label: 'Other' },
];

export const ACCOUNT_FORM_DEFAULT_VALUES: AccountFormValues = {
  name: '',
  kind: 'bank',
  opening_balance: 0,
  is_archived: false,
};
