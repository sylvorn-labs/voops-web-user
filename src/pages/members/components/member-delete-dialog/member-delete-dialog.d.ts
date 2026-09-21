import type { Member, MemberListItem } from '@/types/api/member.d';

export interface MemberDeleteDialogProps {
  member: Member | MemberListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
