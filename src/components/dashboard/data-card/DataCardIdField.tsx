import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';

export interface DataCardIdFieldProps {
  id: string;
  label?: string;
  className?: string;
}

export function DataCardIdField({
  id,
  label = 'ID',
  className,
}: DataCardIdFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!id) return;
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [id]);

  return (
    <div
      data-slot="data-card-id-field"
      className={cn('flex flex-col gap-1.5', className)}
    >
      <span className="text-muted-foreground text-xs leading-none font-medium">
        {label}
      </span>
      <div className="bg-muted/40 border-border/80 flex items-center justify-between gap-2 rounded-lg border px-3 py-2 font-mono text-xs">
        <span className="text-foreground truncate select-all">{id}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground shrink-0"
          aria-label={copied ? 'Copied ID' : 'Copy ID'}
        >
          <HugeiconsIcon
            icon={copied ? Tick02Icon : Copy01Icon}
            className={cn('size-3.5', copied && 'text-green-500')}
          />
        </Button>
      </div>
    </div>
  );
}
