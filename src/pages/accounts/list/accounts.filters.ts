export const ACCOUNT_SEARCHABLE_COLUMNS = [
  { id: 'name', title: 'Account name' },
];

export const ACCOUNT_FILTERABLE_COLUMNS = [
  {
    id: 'kind',
    title: 'Type',
    options: [
      { label: 'Bank Account', value: 'bank' },
      { label: 'Cash', value: 'cash' },
      { label: 'Credit / Debit Card', value: 'card' },
      { label: 'Digital Wallet', value: 'wallet' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'is_archived',
    title: 'Status',
    options: [
      { label: 'Active', value: 'false' },
      { label: 'Archived', value: 'true' },
    ],
  },
];
