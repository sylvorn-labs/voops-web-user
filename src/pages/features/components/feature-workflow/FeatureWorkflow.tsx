import { CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Badge } from '@/components/ui/badge/Badge';
import type { FeatureWorkflowStep } from '../../features.types';

export interface FeatureWorkflowProps {
  id?: string;
  badge?: string;
  heading?: string;
  description?: string;
  steps: FeatureWorkflowStep[];
  className?: string;
}

export function FeatureWorkflow({
  id = 'workflow',
  badge = 'How It Works',
  heading = 'Seamless Workflow from Setup to Daily Tracking',
  description = 'Experience friction-free recordkeeping designed to fit into your active business day without administrative overhead.',
  steps,
  className,
}: FeatureWorkflowProps) {
  return (
    <section id={id} className={cn('bg-muted/30 py-20 md:py-28', className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="bg-card text-foreground gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-xs"
          >
            <span className="bg-income size-2 rounded-full" />
            <span className="uppercase">{badge}</span>
          </Badge>

          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>

          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="mt-16 flex flex-col gap-12">
          {steps.map((step, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={cn(
                  'grid items-center gap-8 lg:grid-cols-2 lg:gap-14',
                  isReversed && 'lg:[&>*:first-child]:order-2',
                )}
              >
                {/* Text Content */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/10 text-primary border-primary/20 flex size-9 items-center justify-center rounded-xl border text-sm font-bold">
                      {step.step}
                    </span>
                    <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                      Workflow Milestone
                    </span>
                  </div>

                  <h3 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="mt-2 space-y-2.5">
                    {step.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <div className="bg-income/10 text-income mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            className="size-3.5"
                          />
                        </div>
                        <span className="text-foreground/90 text-sm leading-normal">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preview / Simulated Card */}
                <div className="border-border/60 bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
                  {step.previewCard ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-semibold">
                            {step.previewCard.badge}
                          </span>
                          <h4 className="text-foreground mt-2 text-lg font-bold">
                            {step.previewCard.title}
                          </h4>
                          {step.previewCard.subtitle && (
                            <p className="text-muted-foreground text-xs">
                              {step.previewCard.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-xl">
                          {step.icon}
                        </div>
                      </div>

                      {/* Metrics if present */}
                      {step.previewCard.metrics && (
                        <div className="grid grid-cols-2 gap-3">
                          {step.previewCard.metrics.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="bg-muted/40 border-border/50 rounded-xl border p-3"
                            >
                              <span className="text-muted-foreground text-xs">
                                {m.label}
                              </span>
                              <p
                                className={cn(
                                  'mt-1 font-bold',
                                  m.tone === 'income' && 'text-income',
                                  m.tone === 'expense' && 'text-expense',
                                  m.tone === 'info' && 'text-info',
                                  (!m.tone || m.tone === 'neutral') &&
                                    'text-foreground',
                                )}
                              >
                                {m.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Items / Records */}
                      {step.previewCard.items && (
                        <div className="space-y-2.5">
                          {step.previewCard.items.map((item, iIdx) => (
                            <div
                              key={iIdx}
                              className="bg-muted/20 border-border/40 flex items-center justify-between rounded-xl border px-3.5 py-2.5"
                            >
                              <div>
                                <p className="text-foreground text-xs font-semibold">
                                  {item.title}
                                </p>
                                <p className="text-muted-foreground text-[11px]">
                                  {item.detail}
                                </p>
                              </div>
                              {item.amount && (
                                <span
                                  className={cn(
                                    'text-xs font-bold',
                                    item.tone === 'income' && 'text-income',
                                    item.tone === 'expense' && 'text-expense',
                                    item.tone === 'info' && 'text-info',
                                    (!item.tone || item.tone === 'neutral') &&
                                      'text-foreground',
                                  )}
                                >
                                  {item.amount}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
                      <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
                        {step.icon}
                      </div>
                      <h4 className="text-foreground text-lg font-bold">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground max-w-sm text-xs">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
