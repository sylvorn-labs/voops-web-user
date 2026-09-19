import { cn } from 'cn';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel/Carousel';
import { defaultIncentives } from './incentives.constants';
import type { IncentivesProps } from './incentives.d';

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
