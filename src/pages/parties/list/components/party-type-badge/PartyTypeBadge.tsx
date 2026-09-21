import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import {
  PARTY_TYPE_LABELS,
  PARTY_TYPE_STYLES,
} from './party-type-badge.constants';
import type { PartyTypeBadgeProps } from './party-type-badge.d';

export function PartyTypeBadge({ type, className }: PartyTypeBadgeProps) {
  const label = PARTY_TYPE_LABELS[type] ?? type;
  const style = PARTY_TYPE_STYLES[type] ?? PARTY_TYPE_STYLES.person;

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
