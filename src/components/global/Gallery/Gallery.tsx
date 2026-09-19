import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button/Button';
import type { CarouselApi } from '@/components/ui/carousel/Carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel/Carousel';
import { defaultItems } from './gallery.constants';
import type { GalleryProps } from './gallery.d';
import { GalleryCard } from './GalleryCard';

export function Gallery({
  id = 'gallery',
  heading = 'Take a Tour Inside Voops',
  demoUrl = '/register',
  demoText = 'Explore live interactive demo',
  items = defaultItems,
  className,
}: GalleryProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);

  const isDemoInternal = demoUrl.startsWith('/') && !demoUrl.startsWith('/#');

  return (
    <section
      id={id}
      className={cn('overflow-hidden py-24 md:py-32', className)}
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            {isDemoInternal ? (
              <Link
                to={demoUrl}
                className="group text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors md:text-base"
              >
                <span>{demoText}</span>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ) : (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors md:text-base"
              >
                <span>{demoText}</span>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>

          <div className="mt-6 flex shrink-0 items-center gap-2 md:mt-0">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="border-border size-10 rounded-xl"
              aria-label="Previous slide"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="border-border size-10 rounded-xl"
              aria-label="Next slide"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
          className="relative w-full max-w-full"
        >
          <CarouselContent className="px-4 md:px-8">
            {items.map(item => (
              <CarouselItem
                key={item.id}
                className="basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[36%] xl:basis-[30%]"
              >
                <GalleryCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
