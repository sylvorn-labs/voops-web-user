import type { DataTableDateRangeColumn } from '@/components/dashboard/data-table/types';
import type { CategoryListItem } from '@/types/api/category.d';

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

export const CATEGORY_DEFAULT_DATE_FIELD = 'created_at' as const;

export const CATEGORY_DATE_RANGE_COLUMNS: DataTableDateRangeColumn<CategoryListItem>[] =
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
