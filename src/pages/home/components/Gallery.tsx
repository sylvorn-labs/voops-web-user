import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export interface GalleryProps {
  id?: string;
  heading?: string;
  demoUrl?: string;
  demoText?: string;
  items?: GalleryItem[];
  className?: string;
}

const defaultItems: GalleryItem[] = [
  {
    id: 'item-1',
    title: 'Multi-Business Master Dashboard',
    summary:
      'Switch effortlessly between corporate entities, agencies, and side projects with instant balance aggregation.',
    url: '/register',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape1.jpeg',
  },
  {
    id: 'item-2',
    title: 'Real-Time Project P&L & Budgeting',
    summary:
      'Track client project profitability, milestones, contractor expenses, and revenue margins without messy spreadsheets.',
    url: '/register',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape2.jpeg',
  },
  {
    id: 'item-3',
    title: 'Category Intelligence & Cash Flow Analytics',
    summary:
      'Deep dive into recurring SaaS subscriptions, operating costs, and tax-deductible expense distributions.',
    url: '/register',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape3.jpeg',
  },
  {
    id: 'item-4',
    title: 'Granular Role-Based Team Permissions',
    summary:
      'Invite teammates, managers, and external accountants with strict role restrictions and comprehensive audit logs.',
    url: '/register',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape4.jpeg',
  },
  {
    id: 'item-5',
    title: 'Sub-Second Cross-Platform Sync',
    summary:
      'Snap receipts on iOS and Android via Flutter with instant synchronization directly to your React desktop workspace.',
    url: '/register',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape5.jpeg',
  },
];

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
            {items.map(item => {
              const isItemInternal =
                item.url.startsWith('/') && !item.url.startsWith('/#');

              const CardContent = (
                <div className="border-border/60 bg-card text-card-foreground group flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xs transition-all duration-300 hover:shadow-md">
                  <div>
                    <div className="bg-muted/30 aspect-3/2 overflow-hidden rounded-xl">
                      <div className="relative h-full w-full origin-bottom transition-transform duration-300 group-hover:scale-105">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <h3 className="text-foreground mt-5 text-lg font-bold tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="text-primary group-hover:text-primary/80 mt-6 inline-flex items-center text-sm font-semibold transition-colors">
                    <span>Learn more</span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="ml-1.5 size-4 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              );

              return (
                <CarouselItem
                  key={item.id}
                  className="basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[36%] xl:basis-[30%]"
                >
                  {isItemInternal ? (
                    <Link to={item.url} className="block h-full">
                      {CardContent}
                    </Link>
                  ) : (
                    <a
                      href={item.url}
                      target={
                        item.url.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        item.url.startsWith('http')
                          ? 'noreferrer noopener'
                          : undefined
                      }
                      className="block h-full"
                    >
                      {CardContent}
                    </a>
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export { Gallery as Gallery6 };
