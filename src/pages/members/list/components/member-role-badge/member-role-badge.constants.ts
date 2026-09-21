import type { MemberRole } from '@/types/api/member.d';

export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  member: 'Member',
  viewer: 'Viewer',
};

export const MEMBER_ROLE_STYLES: Record<MemberRole, string> = {
  owner: 'border-brand-5/25 bg-brand-5/15 text-brand-5 hover:bg-brand-5/25',
  admin: 'border-brand-10/25 bg-brand-10/15 text-brand-10 hover:bg-brand-10/25',
  member: 'border-brand-3/25 bg-brand-3/15 text-brand-3 hover:bg-brand-3/25',
  viewer: 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25',
};
