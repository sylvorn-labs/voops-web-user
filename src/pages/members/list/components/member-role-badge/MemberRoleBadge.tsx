import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import {
  MEMBER_ROLE_LABELS,
  MEMBER_ROLE_STYLES,
} from './member-role-badge.constants';
import type { MemberRoleBadgeProps } from './member-role-badge.d';

export function MemberRoleBadge({ role, className }: MemberRoleBadgeProps) {
  const label = MEMBER_ROLE_LABELS[role] ?? role;
  const style = MEMBER_ROLE_STYLES[role] ?? MEMBER_ROLE_STYLES.viewer;

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium shadow-none transition-colors',
        style,
        className,
      )}
    >
      {label}
    </Badge>
  );
}
