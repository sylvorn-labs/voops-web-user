import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import {
  PARTY_KIND_LABELS,
  PARTY_KIND_STYLES,
} from './party-kind-badge.constants';
import type { PartyKindBadgeProps } from './party-kind-badge.d';

export function PartyKindBadge({ kind, className }: PartyKindBadgeProps) {
  const label = PARTY_KIND_LABELS[kind] ?? kind;
  const style = PARTY_KIND_STYLES[kind] ?? PARTY_KIND_STYLES.other;

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
