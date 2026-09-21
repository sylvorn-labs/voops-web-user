import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { CategoryBadgeProps } from './category-badge.d';
import { CATEGORY_KIND_STYLES } from './category-badge.constants';

export function CategoryBadge({ kind, className }: CategoryBadgeProps) {
  const style = CATEGORY_KIND_STYLES[kind] ?? CATEGORY_KIND_STYLES.both;

  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium capitalize shadow-none transition-colors',
        style,
        className,
      )}
    >
      {kind}
    </Badge>
  );
}
