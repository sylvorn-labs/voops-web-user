import { cn } from 'cn';
import { Badge } from '@/components/ui/badge/Badge';
import type { FeatureCapabilityItem } from '../../features.types';

export interface FeatureCapabilitiesProps {
  id?: string;
  badge?: string;
  heading?: string;
  description?: string;
  capabilities: FeatureCapabilityItem[];
  className?: string;
}

export function FeatureCapabilities({
  id = 'capabilities',
  badge = 'Capabilities & Tools',
  heading = 'Designed for Uncompromising Accuracy and Speed',
  description = 'Every tool you need to streamline financial operations, avoid data drift, and make confident business decisions.',
  capabilities,
  className,
}: FeatureCapabilitiesProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="bg-card text-foreground gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-xs"
          >
            <span className="bg-primary size-2 rounded-full" />
            <span className="uppercase">{badge}</span>
          </Badge>

          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>

          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <div
              key={index}
              className="border-border/60 bg-card group hover:border-border flex flex-col justify-between rounded-2xl border p-7 shadow-xs transition-all hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-xl shadow-xs transition-transform group-hover:scale-105">
                    {item.icon}
                  </div>
                  {item.tag && (
                    <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-foreground mt-5 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
