import type { MemberRole } from '@/types/api/member.d';
import type { MemberFormValues } from './member.d';

export const MEMBER_ROLE_OPTIONS: { label: string; value: MemberRole }[] = [
  { label: 'Owner', value: 'owner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
  { label: 'Viewer', value: 'viewer' },
];

export const MEMBER_INVITE_ROLE_OPTIONS: {
  label: string;
  value: Exclude<MemberRole, 'owner'>;
}[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
  { label: 'Viewer', value: 'viewer' },
];

export const MEMBER_FORM_DEFAULT_VALUES: MemberFormValues = {
  email: '',
  role: 'member',
};
