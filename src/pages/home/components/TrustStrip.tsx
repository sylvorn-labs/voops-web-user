import * as React from 'react';
import {
  Building01Icon,
  FlashIcon,
  GithubIcon,
  SecurityCheckIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

export interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

export interface TrustStripProps {
  items?: TrustItem[];
  className?: string;
}

const defaultItems: TrustItem[] = [
  {
    icon: <HugeiconsIcon icon={GithubIcon} className="size-5" />,
    title: '100% Open Source',
    description: 'Public codebase by Sylvorn Labs',
  },
  {
    icon: <HugeiconsIcon icon={SecurityCheckIcon} className="size-5" />,
    title: 'Strict Privacy',
    description: 'Your financial data stays yours',
  },
  {
    icon: <HugeiconsIcon icon={Building01Icon} className="size-5" />,
    title: 'Multi-Business',
    description: 'Unlimited ventures & accounts',
  },
  {
    icon: <HugeiconsIcon icon={FlashIcon} className="size-5" />,
    title: 'Real-Time Sync',
    description: 'Instant Supabase cloud sync',
  },
];

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

export { TrustStrip as TrustStrip1 };
