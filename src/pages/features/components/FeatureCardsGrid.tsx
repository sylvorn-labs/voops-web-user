import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';

export interface FeatureCardListItem {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    srcDark?: string;
  };
  href?: string;
  label?: string;
}

export interface FeatureCardsGridProps {
  id?: string;
  heading?: string;
  description?: string;
  primaryAction?: {
    text: string;
    url: string;
    isExternal?: boolean;
  };
  features?: FeatureCardListItem[];
  className?: string;
}

const defaultFeatures: FeatureCardListItem[] = [
  {
    title: 'Real-Time Reactive Cloud Sync',
    description:
      'Instant bidirectional data synchronization between Flutter mobile clients and React web dashboard powered by Supabase.',
    image: {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-details/saas-card-detail-1-4x3.svg',
      alt: 'Real-Time Cloud Sync',
    },
    href: 'https://github.com/Sylvorn-Labs/voops-web-user',
  },
  {
    title: 'Multi-Currency & Custom Accounts',
    description:
      'Manage multiple bank accounts, cash drawers, and custom balance accounts with automated currency conversions.',
    image: {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-details/saas-card-detail-2-4x3.svg',
      alt: 'Multi-Currency & Custom Accounts',
    },
    href: 'https://github.com/Sylvorn-Labs/voops-web-user',
  },
  {
    title: 'Granular Role-Based Access Control',
    description:
      'Protect sensitive business finances by assigning granular viewing, editing, and approval permissions to team members.',
    image: {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-details/saas-card-detail-3-4x3.svg',
      alt: 'Granular Role-Based Access Control',
    },
    href: 'https://github.com/Sylvorn-Labs/voops-web-user',
  },
  {
    title: 'Automated Financial Reports & Exports',
    description:
      'Generate audit-ready CSV, Excel, and PDF reports for tax filings, stakeholder presentations, and accountant handoffs.',
    image: {
      src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-details/saas-card-detail-4-4x3.svg',
      alt: 'Automated Financial Reports & Exports',
    },
    href: 'https://github.com/Sylvorn-Labs/voops-web-user',
  },
];

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
            <div
              key={i}
              className="border-border bg-card text-card-foreground flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-shadow hover:shadow-md"
            >
              <a
                href={feature.href || '#'}
                target={feature.href?.startsWith('http') ? '_blank' : undefined}
                rel={
                  feature.href?.startsWith('http')
                    ? 'noreferrer noopener'
                    : undefined
                }
                className="bg-muted/30 block overflow-hidden"
              >
                <img
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="aspect-4/3 h-full w-full object-cover object-top transition-transform duration-300 hover:scale-102"
                />
              </a>
              <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
                <h3 className="text-foreground mb-2 text-xl font-bold tracking-tight sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeatureCardsGrid as Feature72 };
