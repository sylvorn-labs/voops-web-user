import { Separator } from '@/components/ui/separator/Separator';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SheetContextBannerMetaItem {
  /** Short label shown in muted text, e.g. "Received" */
  label: string;
  /** The value displayed next to the label */
  value: string;
  /** When true the item spans both columns */
  fullWidth?: boolean;
}

export interface SheetContextBannerProps {
  /**
   * Primary line — the record's most important identifier.
   * e.g. full name, email address, subject.
   */
  title: string;
  /**
   * Secondary line shown below the title in muted text.
   * e.g. email, subscriber ID, admin ID snippet.
   */
  subtitle?: string;
  /**
   * Slot for badge(s) rendered on the right side of the header row.
   * Accepts any React node — typically one or more `<Badge>` or
   * `<SheetStatusBadge>` elements.
   */
  badge?: React.ReactNode;
  /**
   * Optional grid of key/value metadata rows rendered below the separator.
   * Each item renders as `label: value` in a two-column grid.
   * Items with `fullWidth: true` span both columns.
   */
  meta?: SheetContextBannerMetaItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `SheetContextBanner`
 *
 * A read-only summary strip rendered at the top of every Edit sheet so the
 * admin always knows exactly which record they are editing — even after
 * scrolling past the sheet header.
 *
 * The banner is intentionally presentation-only: it accepts plain strings and
 * React nodes rather than raw entity objects, keeping it fully generic and
 * reusable across the admin, inquiry, and newsletter subscriber edit sheets.
 *
 * ### Usage
 * ```tsx
 * <SheetContextBanner
 *   title={admin.first_name + " " + admin.last_name}
 *   subtitle={admin.email}
 *   badge={
 *     <>
 *       {admin.is_super_admin && <Badge variant="default">Super Admin</Badge>}
 *       <SheetStatusBadge status={status} colorMap={STATUS_COLOR_MAP} />
 *     </>
 *   }
 *   meta={[
 *     { label: "Admin ID", value: admin.id.slice(0, 8) + "…" },
 *     { label: "Created",  value: formatDate(admin.created_at) },
 *   ]}
 * />
 * ```
 *
 * ### What this component does NOT own
 * - Data fetching or mutation logic.
 * - Status badge colour maps (pass a pre-rendered badge via `badge`).
 */
export function SheetContextBanner({
  title,
  subtitle,
  badge,
  meta,
}: SheetContextBannerProps) {
  return (
    <div className="border-border/60 bg-muted/30 flex flex-col gap-2 rounded-xl border p-3">
      {/* ── Header row: title + optional badge ──────────────────────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-foreground truncate text-sm font-medium">
            {title}
          </span>
          {subtitle && (
            <span className="text-muted-foreground truncate text-xs">
              {subtitle}
            </span>
          )}
        </div>

        {badge && (
          <div className="flex shrink-0 items-center gap-1.5">{badge}</div>
        )}
      </div>

      {/* ── Meta grid — only rendered when items are provided ───────────── */}
      {meta && meta.length > 0 && (
        <>
          <Separator />

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {meta.map((item, index) => (
              <div
                key={index}
                className={item.fullWidth ? 'col-span-2' : undefined}
              >
                <span className="text-muted-foreground">{item.label}: </span>
                <span className="text-foreground font-medium">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
