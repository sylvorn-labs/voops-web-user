import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useCallback } from 'react';

import type { SheetDetailRowProps } from '@/types/sheet';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  }, [value]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      className="text-muted-foreground hover:text-foreground shrink-0"
    >
      <HugeiconsIcon
        icon={copied ? Tick02Icon : Copy01Icon}
        className={cn('size-3.5 transition-colors', copied && 'text-green-500')}
      />
    </Button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * `SheetDetailRow`
 *
 * A single key → value read-only row used inside `<SheetFieldGroup>` in view
 * mode. Renders a muted label on top and the value below it. Supports:
 *
 * - `fallback` — shown when `value` is null / undefined / empty string.
 * - `multiline` — wraps the value in a `<p>` with `whitespace-pre-wrap` for
 *   long text blocks like messages or admin notes.
 * - `copyable` — appends a copy-to-clipboard icon button next to the value.
 *   Only works when `value` is a plain `string`.
 *
 * The `value` prop accepts any `React.ReactNode`, so you can pass a
 * `<SheetStatusBadge>`, a formatted date, or any other component directly.
 *
 * @example
 * ```tsx
 * <SheetDetailRow label="Name"    value={inquiry.name} />
 * <SheetDetailRow label="Email"   value={inquiry.email}   copyable />
 * <SheetDetailRow label="Phone"   value={inquiry.phone}   fallback="Not provided" />
 * <SheetDetailRow label="Message" value={inquiry.message} multiline />
 * <SheetDetailRow label="Status"  value={<SheetStatusBadge status={inquiry.status} colorMap={MAP} />} />
 * ```
 */
export function SheetDetailRow({
  label,
  value,
  fallback = '—',
  multiline = false,
  copyable = false,
  className,
}: SheetDetailRowProps) {
  // Determine whether we have a renderable value
  const isEmpty = value === null || value === undefined || value === '';

  const displayValue = isEmpty ? fallback : value;

  // `copyable` only makes sense when the value is a plain string
  const copyableString =
    copyable && typeof value === 'string' && !isEmpty ? value : null;

  return (
    <div
      data-slot="sheet-detail-row"
      className={cn('flex flex-col gap-1', className)}
    >
      {/* Label */}
      <span className="text-muted-foreground text-xs leading-none font-medium">
        {label}
      </span>

      {/* Value */}
      <div className="flex min-h-5 items-start gap-1.5">
        {multiline ? (
          <p
            className={cn(
              'text-foreground flex-1 text-sm leading-relaxed break-words whitespace-pre-wrap',
              isEmpty && 'text-muted-foreground italic',
            )}
          >
            {displayValue}
          </p>
        ) : (
          <span
            className={cn(
              'text-foreground flex-1 text-sm leading-snug',
              isEmpty && 'text-muted-foreground italic',
            )}
          >
            {displayValue}
          </span>
        )}

        {/* Copy button — only rendered for plain-string values */}
        {copyableString && <CopyButton value={copyableString} />}
      </div>
    </div>
  );
}
