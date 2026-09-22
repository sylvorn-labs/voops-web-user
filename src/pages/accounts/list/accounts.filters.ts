import type { DataTableDateRangeColumn } from '@/components/dashboard/data-table/types';
import type { AccountListItem } from '@/types/api/account.d';

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

export const ACCOUNT_DEFAULT_DATE_FIELD = 'created_at' as const;

export const ACCOUNT_DATE_RANGE_COLUMNS: DataTableDateRangeColumn<AccountListItem>[] =
  [
    {
      id: 'created_at',
      title: 'Date',
      fields: [
        { label: 'Created At', value: 'created_at' },
        { label: 'Updated At', value: 'updated_at' },
      ],
    },
  ];
