import type { AccountKind } from '@/types/api/account.d';

export const ACCOUNT_KIND_LABELS: Record<AccountKind, string> = {
  cash: 'Cash',
  bank: 'Bank',
  card: 'Card',
  wallet: 'Wallet',
  other: 'Other',
};

export const ACCOUNT_KIND_STYLES: Record<AccountKind, string> = {
  cash: 'border-brand-7/25 bg-brand-7/15 text-brand-7 hover:bg-brand-7/25',
  bank: 'border-brand-5/25 bg-brand-5/15 text-brand-5 hover:bg-brand-5/25',
  card: 'border-brand-10/25 bg-brand-10/15 text-brand-10 hover:bg-brand-10/25',
  wallet: 'border-brand-6/25 bg-brand-6/15 text-brand-6 hover:bg-brand-6/25',
  other: 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25',
};
