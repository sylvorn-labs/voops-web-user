import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { AccountKindBadgeProps } from './account-kind-badge.d';
import {
  ACCOUNT_KIND_LABELS,
  ACCOUNT_KIND_STYLES,
} from './account-kind-badge.constants';

export function AccountKindBadge({ kind, className }: AccountKindBadgeProps) {
  const style = ACCOUNT_KIND_STYLES[kind] ?? ACCOUNT_KIND_STYLES.other;
  const label = ACCOUNT_KIND_LABELS[kind] ?? kind;

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium capitalize shadow-none transition-colors',
        style,
        className,
      )}
    >
      {label}
    </Badge>
  );
}
