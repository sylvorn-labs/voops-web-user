import { cn } from 'cn';

import { defaultTestimonials } from './testimonials.constants';
import type { TestimonialsProps } from './testimonials.d';
import { TestimonialCard } from './TestimonialCard';

export function Testimonials({
  id = 'testimonials',
  heading = 'Loved by Founders, Agencies & Finance Teams',
  description = 'See how modern entrepreneurs and teams gain effortless financial clarity across all their ventures with Voops.',
  testimonials = defaultTestimonials,
  className,
  maxTestimonials = 6,
}: TestimonialsProps) {
  const visibleList = testimonials.slice(0, maxTestimonials);

  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <h2 className="text-foreground max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base text-balance sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {visibleList.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id || idx}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
