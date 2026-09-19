import type { ComponentProps } from 'react';
import type useEmblaCarousel from 'embla-carousel-react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';

import type { Button } from '@/components/ui/button/button';

export type CarouselApi = UseEmblaCarouselType[1];
export type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps extends ComponentProps<'div'> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

export interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

export interface CarouselContentProps extends ComponentProps<'div'> {}

export interface CarouselItemProps extends ComponentProps<'div'> {}

export interface CarouselPreviousProps extends ComponentProps<typeof Button> {}

export interface CarouselNextProps extends ComponentProps<typeof Button> {}
