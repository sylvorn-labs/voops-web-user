import type { DataTableDateRangeColumn } from '@/components/dashboard/data-table/types';
import type { MemberListItem } from '@/types/api/member.d';

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

export const MEMBER_DEFAULT_DATE_FIELD = 'joined_at' as const;

export const MEMBER_DATE_RANGE_COLUMNS: DataTableDateRangeColumn<MemberListItem>[] =
  [
    {
      id: 'joined_at',
      title: 'Date',
      fields: [
        { label: 'Joined At', value: 'joined_at' },
        { label: 'Created At', value: 'created_at' },
        { label: 'Updated At', value: 'updated_at' },
      ],
    },
  ];
