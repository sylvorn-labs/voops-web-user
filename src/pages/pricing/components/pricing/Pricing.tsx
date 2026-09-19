import { Link } from 'react-router';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button/Button';
import { Separator } from '@/components/ui/separator/Separator';
import { defaultFeatureGroups, defaultPlan } from './pricing.constants';
import type { PricingProps } from './pricing.d';

export function Pricing({
  id = 'pricing',
  heading = 'Free During Development & Beta',
  description = 'All features are 100% free with zero artificial limits during beta testing. In the future, managed cloud instances will offer flexible paid plans while maintaining full open-source self-hosting.',
  plan = defaultPlan,
  featureGroups = defaultFeatureGroups,
  className,
}: PricingProps) {
  const resolvedPlan = {
    ...defaultPlan,
    ...plan,
  };

  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <div className="space-y-3">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-base text-balance sm:text-lg">
              {description}
            </p>
          </div>

          <div className="border-border bg-card text-card-foreground mx-auto mt-6 flex w-full max-w-lg flex-col rounded-2xl border p-8 shadow-xs sm:p-10">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-foreground text-2xl font-bold sm:text-3xl">
                $
              </span>
              <span className="text-foreground text-6xl font-extrabold tracking-tight sm:text-7xl">
                {resolvedPlan.price}
              </span>
              <span className="text-muted-foreground text-base font-medium">
                {resolvedPlan.period}
              </span>
            </div>

            <p className="text-muted-foreground mt-3 text-sm">
              {resolvedPlan.description}
            </p>

            <div className="my-8 space-y-6 text-left">
              {featureGroups.map((group, idx) => (
                <div key={idx} className="space-y-6">
                  <ul className="flex flex-col gap-3.5">
                    {group.map((feature, i) => (
                      <li
                        key={i}
                        className="text-foreground flex items-center justify-between gap-3 text-sm font-medium"
                      >
                        <span>{feature}</span>
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          className="text-income size-4.5 shrink-0"
                        />
                      </li>
                    ))}
                  </ul>
                  {idx < featureGroups.length - 1 && (
                    <Separator className="bg-border/60" />
                  )}
                </div>
              ))}
            </div>

            <Button size="lg" asChild className="w-full">
              <Link to={resolvedPlan.buttonUrl || '/register'}>
                {resolvedPlan.buttonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
