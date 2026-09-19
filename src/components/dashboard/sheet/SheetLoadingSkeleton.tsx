import type { SheetLoadingSkeletonProps } from '@/types/sheet';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import { cn } from '@/lib/utils';

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow({ wide = false }: { wide?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* label */}
      <Skeleton className="h-3.5 w-20 rounded-full" />
      {/* value */}
      <Skeleton className={cn('h-5 rounded-full', wide ? 'w-3/4' : 'w-1/2')} />
    </div>
  );
}

// ─── Action Bar Skeleton ──────────────────────────────────────────────────────

function ActionBarSkeleton() {
  return (
    <div className="border-border/60 bg-muted/30 flex items-center gap-2 rounded-xl border p-3">
      <Skeleton className="h-7 w-20 rounded-full" />
      <Skeleton className="h-7 w-20 rounded-full" />
      <Skeleton className="h-7 w-20 rounded-full" />
      <span className="flex-1" />
      <Skeleton className="h-7 w-16 rounded-full" />
    </div>
  );
}

// ─── Field Group Skeleton ─────────────────────────────────────────────────────

function FieldGroupSkeleton({ rowCount }: { rowCount: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* group title */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-3.5 w-28 rounded-full" />
        <Skeleton className="h-px flex-1" />
      </div>
      {/* rows */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: rowCount }).map((_, i) => (
          <SkeletonRow key={i} wide={i % 3 === 0} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * `SheetLoadingSkeleton`
 *
 * A full-sheet pulse skeleton that mirrors the visual structure of a typical
 * detail sheet: an action bar at the top followed by labelled field groups.
 *
 * The `rows` prop controls the total number of skeleton field rows rendered
 * spread across two groups. Defaults to 5.
 *
 * @example
 * ```tsx
 * if (isLoading) return <SheetLoadingSkeleton rows={7} />;
 * ```
 */
export function SheetLoadingSkeleton({ rows = 5 }: SheetLoadingSkeletonProps) {
  // Distribute rows: first group gets slightly more than half.
  const firstGroupRows = Math.ceil(rows / 2);
  const secondGroupRows = rows - firstGroupRows;

  return (
    <div
      aria-busy="true"
      aria-label="Loading content…"
      className="flex flex-col gap-6 p-6"
    >
      {/* Action bar placeholder */}
      <ActionBarSkeleton />

      {/* First field group */}
      <FieldGroupSkeleton rowCount={firstGroupRows} />

      {/* Second field group (only if there are rows to fill) */}
      {secondGroupRows > 0 && <FieldGroupSkeleton rowCount={secondGroupRows} />}

      {/* Multiline text area placeholder — mimics a "Message" / "Notes" group */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3.5 w-24 rounded-full" />
          <Skeleton className="h-px flex-1" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3.5 w-16 rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
          <Skeleton className="h-4 w-4/6 rounded-full" />
        </div>
      </div>
    </div>
  );
}
