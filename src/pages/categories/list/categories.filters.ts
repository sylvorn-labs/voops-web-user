export const CATEGORY_SEARCHABLE_COLUMNS = [
  { id: 'name', title: 'Category name' },
];

export const CATEGORY_FILTERABLE_COLUMNS = [
  {
    id: 'kind',
    title: 'Type',
    options: [
      { label: 'Income', value: 'income' },
      { label: 'Expense', value: 'expense' },
      { label: 'Both', value: 'both' },
    ],
  },
];
