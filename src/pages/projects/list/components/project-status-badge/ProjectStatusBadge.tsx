import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';
import type { ProjectStatusBadgeProps } from './project-status-badge.d';
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_STYLES,
} from './project-status-badge.constants';

export function ProjectStatusBadge({
  status,
  className,
}: ProjectStatusBadgeProps) {
  const style = PROJECT_STATUS_STYLES[status] ?? PROJECT_STATUS_STYLES.active;
  const label = PROJECT_STATUS_LABELS[status] ?? status;

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
