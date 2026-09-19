import { cn } from 'cn';

import { defaultItems } from './trust-strip.constants';
import type { TrustStripProps } from './trust-strip.d';

export function TrustStrip({
  items = defaultItems,
  className,
}: TrustStripProps) {
  return (
    <section
      className={cn(
        'border-border bg-muted/30 border-y py-6 sm:py-8',
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3.5">
              <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl shadow-xs">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm leading-tight font-bold sm:text-base">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-muted-foreground truncate text-xs">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
