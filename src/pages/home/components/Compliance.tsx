import { cn } from 'cn';

import { Badge } from '@/components/ui/badge';

export interface ComplianceBadge {
  image: string;
  alt: string;
}

export interface ComplianceFeature {
  title: string;
  description: string;
  badgeImage: string;
  badgeAlt: string;
}

export interface ComplianceProps {
  id?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  badges?: ComplianceBadge[];
  features?: ComplianceFeature[];
  className?: string;
}

const defaultBadges: ComplianceBadge[] = [
  {
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/GDPR.svg',
    alt: 'GDPR Compliant',
  },
  {
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/CCPA.svg',
    alt: 'CCPA Compliant',
  },
];

const defaultFeatures: ComplianceFeature[] = [
  {
    title: 'Row-Level Security (RLS) Isolation',
    description:
      'Database-level tenant isolation powered by Supabase PostgreSQL RLS guarantees zero cross-organization data leakage.',
    badgeImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27001.svg',
    badgeAlt: 'ISO-27001',
  },
  {
    title: 'Immutable Ledger & Audit Trails',
    description:
      'Every financial edit, deletion, project milestone update, or role change is timestamped with immutable audit logging.',
    badgeImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27017.svg',
    badgeAlt: 'ISO-27017',
  },
  {
    title: 'Self-Hostable & Full Data Sovereignty',
    description:
      'Retain complete ownership of your business financials. Self-host on your own infrastructure with zero vendor lock-in.',
    badgeImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/compliance/ISO-27018.svg',
    badgeAlt: 'ISO-27018',
  },
];

export function Compliance({
  id = 'compliance',
  tagline = 'Security & Compliance',
  heading = 'Zero-Trust Security & Audit-Ready Compliance',
  description = 'Engineered from the ground up for strict privacy and data isolation. Voops enforces database-level tenant isolation, immutable transaction logs, and end-to-end data sovereignty.',
  badges = defaultBadges,
  features = defaultFeatures,
  className,
}: ComplianceProps) {
  return (
    <section id={id} className={cn('bg-muted/40 py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <Badge
              variant="outline"
              className="bg-card text-foreground gap-2 self-start rounded-full px-3 py-1 shadow-xs"
            >
              <span className="bg-income size-2 rounded-full" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                {tagline}
              </span>
            </Badge>

            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
              {description}
            </p>

            <div className="mt-2 flex items-center gap-6">
              {badges.map((badge, index) => (
                <img
                  key={index}
                  src={badge.image}
                  alt={badge.alt}
                  className="h-16 opacity-60 grayscale transition-opacity hover:opacity-100 md:h-20 dark:invert"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="border-border/60 bg-card text-card-foreground overflow-hidden rounded-2xl border shadow-xs">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  'hover:bg-muted/30 relative overflow-hidden p-6 transition-colors sm:p-8 lg:p-10',
                  index !== 0 && 'border-border/60 border-t',
                )}
              >
                <div className="relative z-10 max-w-[80%]">
                  <h3 className="text-foreground text-lg font-bold sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed sm:text-sm">
                    {feature.description}
                  </p>
                </div>

                <img
                  src={feature.badgeImage}
                  alt={feature.badgeAlt}
                  className="pointer-events-none absolute right-2 -bottom-5 size-24 opacity-20 grayscale select-none sm:size-28 lg:right-6 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Compliance as Compliance1 };
