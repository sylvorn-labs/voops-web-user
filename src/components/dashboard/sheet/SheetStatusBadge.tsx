import type { SheetBadgeVariant, SheetStatusBadgeProps } from '@/types/sheet';
import { Badge } from '@/components/ui/badge/Badge';
import { cn } from '@/lib/utils';

// ─── Default colour map ──────────────────────────────────────────────────────

/**
 * Fallback colour map used when no `colorMap` prop is provided.
 * Maps a handful of common status strings to Badge variants.
 * Feature sheets should always supply their own `colorMap` for accuracy.
 */
const DEFAULT_COLOR_MAP: Record<string, SheetBadgeVariant> = {
  // Generic positive / active
  ACTIVE: 'default',
  ENABLED: 'default',
  PUBLISHED: 'default',
  APPROVED: 'default',

  // Generic neutral / pending
  PENDING: 'secondary',
  NEW: 'secondary',
  DRAFT: 'secondary',
  INACTIVE: 'secondary',

  // Generic in-flight
  IN_PROGRESS: 'outline',
  PROCESSING: 'outline',
  REVIEW: 'outline',

  // Generic negative / terminal
  CLOSED: 'destructive',
  REJECTED: 'destructive',
  DISABLED: 'destructive',
  CANCELLED: 'destructive',
  FAILED: 'destructive',

  // Generic success / completed
  RESOLVED: 'outline',
  COMPLETED: 'default',
  DONE: 'default',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Converts a raw status string into a human-readable label.
 * `"IN_PROGRESS"` → `"In Progress"`
 * `"new"` → `"New"`
 */
function formatStatusLabel(status: string): string {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * `SheetStatusBadge`
 *
 * Renders a coloured `<Badge>` whose variant is determined by a `colorMap`
 * lookup on the `status` string. If the status is not found in the map it
 * falls back to the `"secondary"` variant.
 *
 * The label is auto-formatted from the raw status value
 * (`"IN_PROGRESS"` → `"In Progress"`), so you never need to maintain a
 * separate label map alongside the colour map.
 *
 * Pass a feature-specific `colorMap` for precise control:
 *
 * @example
 * ```tsx
 * const INQUIRY_STATUS_COLORS = {
 *   NEW:         "secondary",
 *   IN_PROGRESS: "default",
 *   RESOLVED:    "outline",
 *   CLOSED:      "destructive",
 * } as const;
 *
 * <SheetStatusBadge
 *   status={inquiry.status}
 *   colorMap={INQUIRY_STATUS_COLORS}
 * />
 * ```
 *
 * Or rely on the built-in defaults for generic statuses:
 *
 * @example
 * ```tsx
 * <SheetStatusBadge status="ACTIVE" />
 * ```
 */
export function SheetStatusBadge({
  status,
  colorMap,
  className,
}: SheetStatusBadgeProps) {
  const map = colorMap ?? DEFAULT_COLOR_MAP;

  // Normalise the lookup key — both "in_progress" and "IN_PROGRESS" work.
  const lookupKey = status.toUpperCase();
  const variant: SheetBadgeVariant = map[lookupKey] ?? 'secondary';

  return (
    <Badge variant={variant} className={cn('capitalize', className)}>
      {formatStatusLabel(status)}
    </Badge>
  );
}
