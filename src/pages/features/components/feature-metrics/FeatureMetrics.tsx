import { cn } from 'cn';
import type { FeatureMetricItem } from '../../features.types';

export interface FeatureMetricsProps {
  metrics: FeatureMetricItem[];
  className?: string;
}

export function FeatureMetrics({ metrics, className }: FeatureMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section
      className={cn(
        'border-border/60 bg-muted/40 border-y py-12 md:py-16',
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="border-border/60 bg-card flex flex-col justify-between rounded-2xl border p-6 shadow-xs"
            >
              <div>
                <p className="text-foreground text-3xl font-extrabold tracking-tight md:text-4xl">
                  {metric.value}
                </p>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  {metric.label}
                </p>
              </div>
              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
