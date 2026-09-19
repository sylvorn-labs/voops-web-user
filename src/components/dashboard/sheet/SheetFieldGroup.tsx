import type { SheetFieldGroupProps } from '@/types/sheet';
import { Separator } from '@/components/ui/separator/Separator';
import { cn } from '@/lib/utils';

/**
 * `SheetFieldGroup`
 *
 * A visual section wrapper used inside sheet content to group related fields
 * under an optional titled separator. Provides consistent vertical spacing
 * and a subtle divider line between sections.
 *
 * @example
 * ```tsx
 * <SheetFieldGroup title="Contact Information">
 *   <SheetDetailRow label="Name"  value={inquiry.name} />
 *   <SheetDetailRow label="Email" value={inquiry.email} copyable />
 * </SheetFieldGroup>
 * ```
 */
export function SheetFieldGroup({
  title,
  children,
  className,
}: SheetFieldGroupProps) {
  return (
    <div
      data-slot="sheet-field-group"
      className={cn('flex flex-col gap-4', className)}
    >
      {/* Section title + separator */}
      {title && (
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground shrink-0 text-xs font-medium tracking-wider uppercase">
            {title}
          </span>
          <Separator className="flex-1" />
        </div>
      )}

      {/* Field rows */}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
