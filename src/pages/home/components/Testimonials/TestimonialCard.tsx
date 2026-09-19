import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/Avatar';
import { Card } from '@/components/ui/card/Card';
import type { TestimonialCardProps } from './testimonial-card.d';

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="border-border bg-card text-card-foreground mb-6 break-inside-avoid rounded-2xl p-6 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <Avatar className="ring-border size-10 rounded-full ring-1">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-bold">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {testimonial.role}
            </p>
          </div>
        </div>
        {testimonial.icon && (
          <a
            href={testimonial.link || '#'}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted-foreground hover:text-foreground shrink-0 transition-opacity"
            aria-label={`View ${testimonial.name}'s testimonial`}
          >
            <img
              alt="Source platform"
              src={testimonial.icon}
              className="size-4.5 opacity-60 hover:opacity-100 dark:invert"
            />
          </a>
        )}
      </div>
      <div className="text-muted-foreground mt-4 text-sm leading-relaxed">
        <p>&ldquo;{testimonial.content}&rdquo;</p>
      </div>
    </Card>
  );
}
