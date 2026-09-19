import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { CategoryBadgeProps } from './category-badge.d';
import { CATEGORY_KIND_BADGE_VARIANTS } from './category-badge.constants';

export function CategoryBadge({ kind, color, className }: CategoryBadgeProps) {
  const variant = CATEGORY_KIND_BADGE_VARIANTS[kind] ?? 'secondary';

  return (
    <Badge
      variant={variant}
      className={cn('inline-flex items-center gap-1.5 capitalize', className)}
    >
      {color && (
        <span
          className="size-2 shrink-0 rounded-full shadow-xs"
          style={{ backgroundColor: color }}
        />
      )}
      {kind}
    </Badge>
  );
}
