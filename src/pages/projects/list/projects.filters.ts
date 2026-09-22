import type { DataTableDateRangeColumn } from '@/components/dashboard/data-table/types';
import type { ProjectListItem } from '@/types/api/project.d';

export const PROJECT_SEARCHABLE_COLUMNS = [
  { id: 'name', title: 'Project name' },
];

export const PROJECT_FILTERABLE_COLUMNS = [
  {
    id: 'status',
    title: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' },
      { label: 'On Hold', value: 'on_hold' },
      { label: 'Archived', value: 'archived' },
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

export const PROJECT_DEFAULT_DATE_FIELD = 'created_at' as const;

export const PROJECT_DATE_RANGE_COLUMNS: DataTableDateRangeColumn<ProjectListItem>[] =
  [
    {
      id: 'created_at',
      title: 'Date',
      fields: [
        { label: 'Created At', value: 'created_at' },
        { label: 'Updated At', value: 'updated_at' },
        { label: 'Start Date', value: 'start_date', allowFuture: true },
        { label: 'End Date', value: 'end_date', allowFuture: true },
      ],
    },
  ];
