import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { TransactionArchiveBadgeProps } from './transaction-archive-badge.d';

export function TransactionArchiveBadge({
  isArchived,
  className,
}: TransactionArchiveBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium shadow-none transition-colors',
        isArchived
          ? 'border-gray-7/25 bg-gray-7/15 text-gray-7 hover:bg-gray-7/25'
          : 'border-brand-7/25 bg-brand-7/15 text-brand-7 hover:bg-brand-7/25',
        className,
      )}
    >
      {isArchived ? 'Archived' : 'Active'}
    </Badge>
  );
}
