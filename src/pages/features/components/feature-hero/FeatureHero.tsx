import { ArrowRight01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from 'react-router';
import { cn } from 'cn';

import { useAuthIsAuthenticated } from '@/stores/auth/auth.selectors';
import { Button } from '@/components/ui/button/Button';
import { Badge } from '@/components/ui/badge/Badge';

export interface FeatureHeroProps {
  badge: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  imageLight: string;
  imageDark: string;
  className?: string;
}

export function FeatureHero({
  badge,
  titleLead,
  titleAccent,
  description,
  imageLight,
  imageDark,
  className,
}: FeatureHeroProps) {
  const isAuthenticated = useAuthIsAuthenticated();

  return (
    <section
      className={cn('overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24', className)}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div className="relative isolate flex flex-col items-center gap-6 text-center">
            {/* Background Rings */}
            <div
              aria-hidden
              className="border-border pointer-events-none absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border mask-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 [-webkit-mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1100px] md:p-32"
            >
              <div className="border-border size-full rounded-full border p-16 md:p-32">
                <div className="border-border size-full rounded-full border" />
              </div>
            </div>

            {/* Feature Tag */}
            <Badge
              variant="outline"
              className="bg-card text-foreground gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs"
            >
              <HugeiconsIcon
                icon={SparklesIcon}
                className="text-primary size-3.5"
              />
              <span>{badge}</span>
            </Badge>

            {/* Headline */}
            <h1 className="text-foreground max-w-4xl text-3xl font-extrabold tracking-tight text-pretty sm:text-4xl md:text-5xl lg:text-6xl">
              <span>{titleLead} </span>
              <span className="text-primary">{titleAccent}</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed text-balance sm:text-lg md:text-xl">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              {isAuthenticated ? (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/" className="flex items-center gap-2">
                    <span>Open Dashboard</span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4"
                      strokeWidth={2}
                    />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/register" className="flex items-center gap-2">
                    <span>Try Voops for Free</span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4"
                      strokeWidth={2}
                    />
                  </Link>
                </Button>
              )}

              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link to="/features" className="flex items-center gap-2">
                  <span>Explore All Features</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="relative mx-auto mt-4 w-full max-w-5xl">
            <div className="border-border/80 bg-card overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xs md:p-3">
              <img
                src={imageLight}
                alt={`${titleLead} ${titleAccent}`}
                className="aspect-16/9 w-full rounded-xl object-cover object-top dark:hidden"
              />
              <img
                src={imageDark}
                alt={`${titleLead} ${titleAccent} Dark`}
                className="hidden aspect-16/9 w-full rounded-xl object-cover object-top dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
