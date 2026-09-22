import type { DataTableDateRangeColumn } from '@/components/dashboard/data-table/types';
import type { PartyListItem } from '@/types/api/party.d';

export const PARTY_SEARCHABLE_COLUMNS = [{ id: 'name', title: 'Party name' }];

export const PARTY_FILTERABLE_COLUMNS = [
  {
    id: 'type',
    title: 'Entity Type',
    options: [
      { label: 'Person', value: 'person' },
      { label: 'Company', value: 'company' },
    ],
  },
  {
    id: 'kind',
    title: 'Kind',
    options: [
      { label: 'Customer', value: 'customer' },
      { label: 'Vendor / Supplier', value: 'vendor' },
      { label: 'Employee', value: 'employee' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'is_archived',
    title: 'Archive Status',
    options: [
      { label: 'Active', value: 'false' },
      { label: 'Archived', value: 'true' },
    ],
  },
];

export const PARTY_DEFAULT_DATE_FIELD = 'created_at' as const;

export const PARTY_DATE_RANGE_COLUMNS: DataTableDateRangeColumn<PartyListItem>[] =
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
