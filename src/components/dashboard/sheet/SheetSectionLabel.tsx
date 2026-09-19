import { Separator } from '@/components/ui/separator/Separator';

// ─── SheetSectionLabel ────────────────────────────────────────────────────────

/**
 * `SheetSectionLabel`
 *
 * A styled section divider used inside sheet forms to visually group related
 * fields. Renders an uppercase label with a `<Separator>` line extending to
 * its right.
 *
 * @example
 * ```tsx
 * <SheetSectionLabel>Contact Information</SheetSectionLabel>
 * <FieldGroup>…</FieldGroup>
 * ```
 */
export function SheetSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground shrink-0 text-xs font-medium tracking-wider uppercase">
        {children}
      </span>
      <Separator className="flex-1" />
    </div>
  );
}
