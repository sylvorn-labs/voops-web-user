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
  );
}
