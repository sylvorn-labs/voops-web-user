export const MEMBER_SEARCHABLE_COLUMNS = [{ id: 'email', title: 'Email' }];

export const MEMBER_FILTERABLE_COLUMNS = [
  {
    id: 'role',
    title: 'Role',
    options: [
      { label: 'Owner', value: 'owner' },
      { label: 'Admin', value: 'admin' },
      { label: 'Member', value: 'member' },
      { label: 'Viewer', value: 'viewer' },
    ],
  },
];
