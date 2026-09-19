import { Link } from 'react-router';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import type { GalleryCardProps } from './GalleryCard.d';

export function GalleryCard({ item }: GalleryCardProps) {
  const isItemInternal = item.url.startsWith('/') && !item.url.startsWith('/#');

  const cardContent = (
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

  return isItemInternal ? (
    <Link to={item.url} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    <a
      href={item.url}
      target={item.url.startsWith('http') ? '_blank' : undefined}
      rel={item.url.startsWith('http') ? 'noreferrer noopener' : undefined}
      className="block h-full"
    >
      {cardContent}
    </a>
  );
}
