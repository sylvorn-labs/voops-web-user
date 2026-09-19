import { Badge } from '@/components/ui/badge/Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SheetCharCounterProps {
  current: number;
  max: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `SheetCharCounter`
 *
 * A compact inline badge that displays a live `current / max` character count
 * for textarea fields inside sheets.
 *
 * Colour states:
 * - **outline** — normal (below 85 % of limit)
 * - **secondary** — approaching limit (85 %–100 %)
 * - **destructive** — over limit (> 100 %)
 *
 * Usage:
 * ```tsx
 * <div className="flex items-center justify-between gap-2">
 *   <FieldLabel htmlFor="notes">Notes</FieldLabel>
 *   <SheetCharCounter current={value.length} max={2000} />
 * </div>
 * ```
 */
export function SheetCharCounter({ current, max }: SheetCharCounterProps) {
  const nearLimit = current > max * 0.85;
  const overLimit = current > max;

  return (
    <Badge
      variant={overLimit ? 'destructive' : nearLimit ? 'secondary' : 'outline'}
      className="h-4 px-1.5 font-mono text-[10px] tabular-nums"
    >
      {current}/{max}
    </Badge>
  );
}
