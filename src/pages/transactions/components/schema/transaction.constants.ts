import type { TransactionFormValues } from './transaction.d';

export const TRANSACTION_TYPE_OPTIONS = [
  { label: 'Expense (Debit)', value: 'debit' },
  { label: 'Income (Credit)', value: 'credit' },
] as const;

export const TRANSACTION_FORM_DEFAULT_VALUES: TransactionFormValues = {
  type: 'debit',
  amount: 0,
  occurred_on: new Date().toISOString().slice(0, 10),
  account_id: '',
  category_id: '',
  project_id: '',
  party_id: '',
  description: '',
  is_archived: false,
};
