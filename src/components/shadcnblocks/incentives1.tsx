import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Building2, Code2, RefreshCw, ShieldCheck } from 'lucide-react';
import { cn } from 'cn';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export interface IncentiveItem {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

export interface Incentives1Props {
  incentives?: IncentiveItem[];
  className?: string;
}

const DEFAULT_INCENTIVES: IncentiveItem[] = [
  {
    id: '1',
    title: 'Multi-Business Isolation',
    text: 'Cryptographically separated ledgers',
    icon: Building2,
  },
  {
    id: '2',
    title: 'Real-Time Sync',
    text: 'Sub-second ledger cloud updates',
    icon: RefreshCw,
  },
  {
    id: '3',
    title: '100% Free & Open Source',
    text: 'Public codebase by Sylvorn Labs',
    icon: Code2,
  },
  {
    id: '4',
    title: 'Bank-Grade Security',
    text: 'Strict RLS & private data policies',
    icon: ShieldCheck,
  },
];

export function Incentives1({
  incentives = DEFAULT_INCENTIVES,
  className,
}: Incentives1Props) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            breakpoints: {
              '(min-width: 768px)': {
                active: false,
              },
            },
            align: 'start',
          }}
        >
          <CarouselContent className="md:ml-0 md:grid md:grid-cols-[repeat(2,_minmax(12.5rem,_18.75rem))] md:justify-center md:gap-6 xl:grid-cols-[repeat(4,_minmax(12.5rem,_18.75rem))]">
            {incentives.map(({ title, icon: Icon, text, id }) => (
              <CarouselItem key={id} className="basis-75 md:pl-0">
                <div className="flex items-center gap-5">
                  <div className="shrink-0 basis-16">
                    <div className="border-border bg-muted/40 text-primary flex size-16 items-center justify-center rounded-full border shadow-2xs">
                      <Icon className="size-8" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-foreground text-base font-semibold">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{text}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export { Incentives1 as Incentives };
