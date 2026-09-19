import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from 'react-router';
import { cn } from 'cn';

import { coreFeatures } from '../../features.data';

export interface RelatedFeaturesProps {
  currentSlug?: string;
  heading?: string;
  description?: string;
  className?: string;
}

export function RelatedFeatures({
  currentSlug = '',
  heading = 'Explore Voops Core Capabilities',
  description = 'Voops is an all-in-one financial intelligence suite. Discover how each module powers your operations with pinpoint accuracy.',
  className,
}: RelatedFeaturesProps) {
  const displayedFeatures = currentSlug
    ? coreFeatures.filter(f => f.slug !== currentSlug)
    : coreFeatures;

  return (
    <section className={cn('bg-muted/40 py-20 md:py-28', className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedFeatures.map(item => {
            const Icon = item.icon;

            return (
              <Link
                key={item.slug}
                to={item.url}
                className="group border-border/60 bg-card hover:border-primary/40 flex flex-col justify-between rounded-2xl border p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl">
                      <HugeiconsIcon icon={Icon} className="size-6" />
                    </div>
                    <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-foreground group-hover:text-primary mt-5 text-lg font-bold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="text-primary mt-6 flex items-center gap-1.5 text-xs font-bold">
                  <span>Explore module</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="size-3.5 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
