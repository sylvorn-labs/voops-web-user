import { cn } from 'cn';

import { Badge } from '@/components/ui/badge/Badge';
import { defaultBadges, defaultFeatures } from './compliance.constants';
import type { ComplianceProps } from './compliance.d';

export function Compliance({
  id = 'compliance',
  tagline = 'Open Source & Security',
  heading = 'Zero-Trust Security & Open-Source Sovereignty',
  description = 'Engineered for transparency, privacy, and full data control. Voops enforces database-level tenant isolation via PostgreSQL RLS, audit-ready ledgers, and zero proprietary lock-in.',
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

            <div className="mt-2 flex flex-wrap items-center gap-6">
              {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={index}
                    className="border-border/60 bg-card flex items-center gap-2 rounded-xl border px-4 py-2 shadow-xs"
                  >
                    {Icon ? (
                      <Icon className="text-foreground size-6" />
                    ) : badge.image ? (
                      <img
                        src={badge.image}
                        alt={badge.alt || badge.title}
                        className="h-6 w-auto"
                      />
                    ) : null}
                    <span className="text-foreground text-xs font-semibold">
                      {badge.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stacked Cards */}
          <div className="border-border/60 bg-card text-card-foreground overflow-hidden rounded-2xl border shadow-xs">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
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

                  {Icon ? (
                    <Icon className="pointer-events-none absolute right-2 -bottom-4 size-24 opacity-10 grayscale select-none sm:size-28 lg:right-6" />
                  ) : feature.badgeImage ? (
                    <img
                      src={feature.badgeImage}
                      alt={feature.badgeAlt || feature.title}
                      className="pointer-events-none absolute right-2 -bottom-5 size-24 opacity-20 grayscale select-none sm:size-28 lg:right-6 dark:invert"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
