import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { TransactionTypeBadgeProps } from './transaction-type-badge.d';
import {
  TRANSACTION_TYPE_LABELS,
  TRANSACTION_TYPE_STYLES,
} from './transaction-type-badge.constants';

export function TransactionTypeBadge({
  type,
  className,
}: TransactionTypeBadgeProps) {
  const style = TRANSACTION_TYPE_STYLES[type] ?? TRANSACTION_TYPE_STYLES.debit;
  const label = TRANSACTION_TYPE_LABELS[type] ?? type;

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
