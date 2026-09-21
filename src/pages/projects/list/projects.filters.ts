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
