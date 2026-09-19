import type { ReactNode } from 'react';

import { Separator } from '@/components/ui/separator/Separator';
import { cn } from '@/lib/utils';

export interface DataCardProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function DataCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: DataCardProps) {
  return (
    <div
      data-slot="data-card"
      className={cn(
        'bg-card text-card-foreground flex flex-col rounded-xl border shadow-xs',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm leading-none font-semibold">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-xs">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <Separator />
      <div className={cn('flex flex-col gap-4 p-5', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
