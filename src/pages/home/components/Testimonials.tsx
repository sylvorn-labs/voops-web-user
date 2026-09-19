import { cn } from 'cn';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export interface TestimonialItem {
  id?: string;
  name: string;
  username: string;
  role: string;
  avatar: string;
  content: string;
  link?: string;
  icon?: string;
}

export interface TestimonialsProps {
  id?: string;
  heading?: string;
  description?: string;
  testimonials?: TestimonialItem[];
  className?: string;
  maxTestimonials?: number;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: '1',
    name: 'Drew Cano',
    username: 'drewcano',
    role: 'Multi-Business Founder',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    content:
      'Voops completely replaced our mess of spreadsheets. Managing expenses across my e-commerce brand and consulting agency under one single login with segregated bank accounts is a total game changer.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/x-icon.svg',
  },
  {
    id: '2',
    name: 'Orlando Diggs',
    username: 'orlandod',
    role: 'Agency Director',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop',
    content:
      'The project P&L tracking feature saved us thousands last quarter. We can tie every contractor invoice and software expense directly to client milestones and verify profitability in real time.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/linkedin-icon.svg',
  },
  {
    id: '3',
    name: 'Kate Morrison',
    username: 'katem',
    role: 'Head of Operations',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
    content:
      'The role-based permission system gives me full confidence. Our team members can submit their receipts without seeing confidential payroll or executive balance accounts.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/x-icon.svg',
  },
  {
    id: '4',
    name: 'Koray Okumus',
    username: 'korayo',
    role: 'Tech Lead & Open Source Advocate',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop',
    content:
      'Built on Supabase, Flutter, and React with open-source transparency. The sub-second synchronization between mobile and web is buttery smooth. Sylvorn Labs nailed the technical execution.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/x-icon.svg',
  },
  {
    id: '5',
    name: 'Andi Lane',
    username: 'andilane',
    role: 'Freelance Design Lead',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop',
    content:
      'Category analytics and people tracking make tax season painless. I can filter all deductible software subscriptions and vendor payouts with one click and export audit-ready CSVs.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/x-icon.svg',
  },
  {
    id: '6',
    name: 'Ava Wright',
    username: 'avawright',
    role: 'CFO & Angel Investor',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    content:
      'The UX is minimal, blazing fast, and doesn’t get in your way. Being able to track multiple bank currencies, cash registers, and budgets across portfolio startups is phenomenal.',
    link: '#',
    icon: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/testimonials/social-network-icons/linkedin-icon.svg',
  },
];

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
            {visibleList.map((testimonial, idx) => {
              const initials = testimonial.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);

              return (
                <Card
                  key={testimonial.id || idx}
                  className="border-border bg-card text-card-foreground mb-6 break-inside-avoid rounded-2xl p-6 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="ring-border size-10 rounded-full ring-1">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
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
                    <p>"{testimonial.content}"</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Testimonials as Testimonial9 };
