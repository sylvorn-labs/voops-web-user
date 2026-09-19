import { useState } from 'react';
import { cn } from 'cn';

import { defaultIndustries } from './industries.constants';
import type { IndustriesProps } from './industries.d';
import { IndustryCard } from './IndustryCard';

export function Industries({
  id = 'industries',
  className,
  title = 'Tailored for Every Business Model',
  industryLabel = 'Why Voops',
  industries = defaultIndustries,
}: IndustriesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center md:mb-16 md:text-left">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <IndustryCard
              key={index}
              industry={industry}
              index={index}
              industryLabel={industryLabel}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
