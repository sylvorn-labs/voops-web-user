import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { defaultFeatures } from './FeatureCardsGrid.constants';
import type { FeatureCardsGridProps } from './FeatureCardsGrid.d';
import { FeatureCardGridItem } from './FeatureCardGridItem';

export function FeatureCardsGrid({
  id = 'capabilities',
  heading = 'Built for Scalable Multi-Business Operations',
  description = 'Open-source expense tracking engineered by Sylvorn Labs with strict data privacy, enterprise-grade architecture, and zero bloat.',
  primaryAction = {
    text: 'Explore open source code',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    isExternal: true,
  },
  features = defaultFeatures,
  className,
}: FeatureCardsGridProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        {/* Narrow Header Band */}
        <div className="mb-12 lg:mb-16 lg:max-w-md">
          <h2 className="text-foreground mb-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="text-muted-foreground mb-6 text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          )}
          {primaryAction && (
            <Button
              variant="link"
              asChild
              className="p-0 text-base font-semibold"
            >
              <a
                href={primaryAction.url}
                target={primaryAction.isExternal ? '_blank' : undefined}
                rel={
                  primaryAction.isExternal ? 'noreferrer noopener' : undefined
                }
                className="group inline-flex items-center gap-1.5"
              >
                <span>{primaryAction.text}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </Button>
          )}
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
          {features.slice(0, 4).map((feature, i) => (
            <FeatureCardGridItem key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
