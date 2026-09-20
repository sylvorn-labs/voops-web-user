export const PARTY_SEARCHABLE_COLUMNS = [{ id: 'name', title: 'Party name' }];

export const PARTY_FILTERABLE_COLUMNS = [
  {
    id: 'kind',
    title: 'Type',
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
