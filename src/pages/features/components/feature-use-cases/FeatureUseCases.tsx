import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Badge } from '@/components/ui/badge/Badge';
import type { FeatureUseCaseItem } from '../../features.types';

export interface FeatureUseCasesProps {
  id?: string;
  badge?: string;
  heading?: string;
  description?: string;
  useCases: FeatureUseCaseItem[];
  className?: string;
}

export function FeatureUseCases({
  id = 'use-cases',
  badge = 'Tailored Solutions',
  heading = 'Built for the Real-World Demands of Modern Business',
  description = 'See how different business models and operator roles leverage this capability to eliminate financial overhead.',
  useCases,
  className,
}: FeatureUseCasesProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="bg-card text-foreground gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-xs"
          >
            <span className="bg-balance size-2 rounded-full" />
            <span className="uppercase">{badge}</span>
          </Badge>

          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>

          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, index) => (
            <div
              key={index}
              className="border-border/60 bg-card flex flex-col justify-between rounded-2xl border p-7 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                    {uc.target}
                  </span>
                  <div className="text-muted-foreground flex size-9 items-center justify-center">
                    {uc.icon}
                  </div>
                </div>

                <h3 className="text-foreground mt-4 text-xl font-bold">
                  {uc.title}
                </h3>

                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {uc.description}
                </p>

                <div className="border-border/60 mt-6 border-t pt-5">
                  <span className="text-foreground text-xs font-semibold tracking-wider uppercase">
                    Key Advantages
                  </span>
                  <ul className="mt-3 space-y-2">
                    {uc.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <div className="bg-income/10 text-income mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full">
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            className="size-3"
                          />
                        </div>
                        <span className="text-foreground/80 text-xs leading-normal">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
