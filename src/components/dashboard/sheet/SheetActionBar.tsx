import { HugeiconsIcon } from '@hugeicons/react';

import type { SheetActionBarButtonProps } from '@/types/sheet';
import { Separator } from '@/components/ui/separator/Separator';
import { Button } from '@/components/ui/button/Button';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { cn } from '@/lib/utils';

// ─── Action Button ────────────────────────────────────────────────────────────

/**
 * An individual action button rendered inside `<SheetActionBar>`.
 * Supports an optional leading icon, a loading spinner, and all standard
 * Button variants. The `loading` prop disables the button and swaps the icon
 * for a `<Spinner>` to give instant visual feedback while a mutation is in
 * flight.
 *
 * @example
 * ```tsx
 * <SheetActionBar.Button
 *   icon={CheckmarkCircle02Icon}
 *   label="Resolve"
 *   variant="default"
 *   loading={resolveMutation.isPending}
 *   disabled={inquiry.status === "RESOLVED"}
 *   onClick={handleResolve}
 * />
 * ```
 */
function SheetActionBarButton({
  icon,
  label,
  onClick,
  variant = 'outline',
  disabled = false,
  loading = false,
  className,
}: SheetActionBarButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={label}
      className={cn('shrink-0 gap-1.5', className)}
    >
      {loading ? (
        <Spinner className="size-3.5" />
      ) : (
        icon && <HugeiconsIcon icon={icon} className="size-3.5 shrink-0" />
      )}
      {label}
    </Button>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

/**
 * A thin vertical divider that visually separates action groups inside the
 * action bar.
 *
 * @example
 * ```tsx
 * <SheetActionBar>
 *   <SheetActionBar.Button label="Assign" ... />
 *   <SheetActionBar.Button label="Resolve" ... />
 *   <SheetActionBar.Separator />
 *   <SheetActionBar.Button label="Delete" variant="destructive" ... />
 * </SheetActionBar>
 * ```
 */
function SheetActionBarSeparator() {
  return (
    <Separator
      orientation="vertical"
      className="mx-0.5 h-5 shrink-0 self-center"
    />
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

/**
 * `SheetActionBar`
 *
 * A horizontal strip of action buttons rendered **inside the sheet content**
 * (not in the footer). Intended for **view mode** contextual controls — e.g.
 * Assign, Resolve, Reopen, Close, or Edit — that do not require a full form
 * submission flow.
 *
 * The bar has a subtle bordered background to visually separate it from the
 * field groups below. Buttons overflow horizontally on narrow screens and the
 * bar scrolls to keep all actions accessible.
 *
 * Use the compound sub-components for a consistent look:
 * - `<SheetActionBar.Button>` — a labelled action button with optional icon
 *   and loading state.
 * - `<SheetActionBar.Separator>` — a vertical divider between button groups.
 *
 * @example
 * ```tsx
 * <SheetActionBar>
 *   <SheetActionBar.Button
 *     icon={UserAdd01Icon}
 *     label="Assign"
 *     disabled={!!inquiry.assigned_to}
 *     onClick={openAssignPopover}
 *   />
 *   <SheetActionBar.Button
 *     icon={CheckmarkCircle02Icon}
 *     label="Resolve"
 *     loading={resolveMutation.isPending}
 *     disabled={inquiry.status === "RESOLVED"}
 *     onClick={handleResolve}
 *   />
 *   <SheetActionBar.Separator />
 *   <SheetActionBar.Button
 *     icon={Delete02Icon}
 *     label="Delete"
 *     variant="destructive"
 *     onClick={handleDelete}
 *   />
 * </SheetActionBar>
 * ```
 */
function SheetActionBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="sheet-action-bar"
      role="toolbar"
      aria-label="Record actions"
      className={cn(
        'flex flex-wrap items-center gap-1.5',
        'border-border/60 bg-muted/30 rounded-xl border p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Compound exports ─────────────────────────────────────────────────────────

SheetActionBar.Button = SheetActionBarButton;
SheetActionBar.Separator = SheetActionBarSeparator;

export { SheetActionBar };
