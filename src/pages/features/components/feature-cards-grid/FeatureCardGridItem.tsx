import type { FeatureCardGridItemProps } from './feature-card-grid-item.d';

export function FeatureCardGridItem({ feature }: FeatureCardGridItemProps) {
  return (
    <div className="border-border bg-card text-card-foreground flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-shadow hover:shadow-md">
      <a
        href={feature.href || '#'}
        target={feature.href?.startsWith('http') ? '_blank' : undefined}
        rel={
          feature.href?.startsWith('http') ? 'noreferrer noopener' : undefined
        }
        className="bg-muted/30 flex aspect-4/3 items-center justify-center overflow-hidden p-6"
      >
        <img
          src={feature.image.src}
          alt={feature.image.alt}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
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
  );
}
