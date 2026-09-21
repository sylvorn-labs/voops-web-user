import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useCallback, type ReactNode } from 'react';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

export interface DataCardFieldProps {
  label: string;
  value?: ReactNode;
  fallback?: string;
  copyable?: boolean;
  className?: string;
}

export function DataCardField({
  label,
  value,
  fallback = '—',
  copyable = false,
  className,
}: DataCardFieldProps) {
  const [copied, setCopied] = useState(false);

  const isEmpty = value === null || value === undefined || value === '';
  const displayValue = isEmpty ? fallback : value;

  const copyableString =
    copyable && typeof value === 'string' && !isEmpty ? value : null;

  const handleCopy = useCallback(async () => {
    if (!copyableString) return;
    try {
      await navigator.clipboard.writeText(copyableString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [copyableString]);

  return (
    <div
      data-slot="data-card-field"
      className={cn(
        'flex items-center justify-between gap-4 text-xs',
        className,
      )}
    >
      <span className="text-muted-foreground font-medium">{label}</span>
      <div className="text-foreground flex items-center gap-1.5 font-medium">
        {displayValue}
        {copyableString && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground shrink-0"
            aria-label={copied ? 'Copied' : 'Copy'}
          >
            <HugeiconsIcon
              icon={copied ? Tick02Icon : Copy01Icon}
              className={cn('size-3.5', copied && 'text-green-500')}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
