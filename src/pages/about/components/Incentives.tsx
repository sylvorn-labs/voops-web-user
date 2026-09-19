import * as React from 'react';
import {
  Building01Icon,
  Download01Icon,
  FlashIcon,
  GithubIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
  icon: React.ReactNode;
}

export interface IncentivesProps {
  id?: string;
  heading?: string;
  description?: string;
  incentives?: IncentiveItem[];
  className?: string;
}

const defaultIncentives: IncentiveItem[] = [
  {
    id: '1',
    title: 'Zero Vendor Lock-in',
    text: 'Export SQL, JSON & CSV backups anytime with full data ownership.',
    icon: (
      <HugeiconsIcon icon={Download01Icon} className="text-primary size-7" />
    ),
  },
  {
    id: '2',
    title: 'Real-time Mobile Sync',
    text: 'Instant sub-second synchronization across iOS and Android apps.',
    icon: <HugeiconsIcon icon={FlashIcon} className="text-income size-7" />,
  },
  {
    id: '3',
    title: 'Multi-Tenant Architecture',
    text: 'Manage unlimited business ledgers and separate bank accounts.',
    icon: (
      <HugeiconsIcon icon={Building01Icon} className="text-primary size-7" />
    ),
  },
  {
    id: '4',
    title: 'Community Backed',
    text: 'Transparent roadmap and open source commits by Sylvorn Labs.',
    icon: (
      <HugeiconsIcon icon={GithubIcon} className="text-foreground size-7" />
    ),
  },
];

export function Incentives({
  id = 'incentives',
  incentives = defaultIncentives,
  className,
}: IncentivesProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
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
          <CarouselContent className="md:ml-0 md:grid md:grid-cols-2 md:justify-center md:gap-6 xl:grid-cols-4">
            {incentives.map(({ title, icon, text, id: itemKey }) => (
              <CarouselItem
                key={itemKey}
                className="basis-[82%] sm:basis-[60%] md:pl-0"
              >
                <div className="border-border/60 bg-card text-card-foreground flex h-full items-center gap-5 rounded-2xl border p-6 shadow-xs transition-shadow hover:shadow-md">
                  <div className="shrink-0">
                    <div className="border-border bg-background flex size-14 items-center justify-center rounded-2xl border shadow-xs sm:size-16">
                      {icon}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-foreground text-base leading-snug font-bold">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                      {text}
                    </p>
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

export { Incentives as Incentives1 };
