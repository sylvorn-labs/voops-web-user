import { ArrowRight01Icon, Coins01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Link } from 'react-router';
import { cn } from 'cn';

import { useAuthIsAuthenticated } from '@/stores/auth/auth.selectors';
import { Button } from '@/components/ui/button/Button';
import type { HeroProps } from './hero.d';

export function Hero({ className }: HeroProps = {}) {
  const isAuthenticated = useAuthIsAuthenticated();

  return (
    <section className={cn('overflow-hidden py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div className="relative isolate flex flex-col items-center gap-6">
            {/* Background Concentric Rings */}
            <div
              aria-hidden
              className="border-border pointer-events-none absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border mask-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 [-webkit-mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1200px] md:p-32"
            >
              <div className="border-border size-full rounded-full border p-16 md:p-32">
                <div className="border-border size-full rounded-full border" />
              </div>
            </div>

            {/* Top Leading Badge / Icon */}
            <div className="bg-primary/10 border-primary/20 text-primary flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs">
              <HugeiconsIcon icon={Coins01Icon} className="size-4" />
              <span>Open Source Expense Tracker by Sylvorn Labs</span>
            </div>

            {/* Headline */}
            <h1 className="text-foreground max-w-7xl text-center text-4xl font-extrabold tracking-tight text-pretty sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Track your expenses</span>
              <span className="text-primary block">with Voops</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-muted-foreground max-w-2xl text-center text-base font-normal text-balance sm:text-lg md:text-xl">
              Organize multiple businesses, team members, projects, accounts,
              and categories with real-time analytics. Built on Supabase,
              Flutter, and React.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              {isAuthenticated ? (
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/" className="flex items-center gap-2">
                    <span>Go to Dashboard</span>
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
                    <span>Start Tracking Now</span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-4"
                      strokeWidth={2}
                    />
                  </Link>
                </Button>
              )}
            </div>

            {/* Platform Status Byline */}
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="bg-income size-1.5 rounded-full" />
                Mobile App (Flutter)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="bg-info size-1.5 rounded-full" />
                Web App (React)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="bg-income size-1.5 rounded-full" />
                Backend (Supabase)
              </span>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative mx-auto w-full max-w-5xl">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9.png"
              alt="Voops Dashboard Preview"
              className="border-border aspect-3/4 max-h-[524px] w-full rounded-xl border object-cover object-top shadow-2xl md:aspect-video dark:hidden"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/saas-hero/saas-hero-1-16x9-dark.png"
              alt="Voops Dashboard Preview Dark"
              className="border-border hidden aspect-3/4 max-h-[524px] w-full rounded-xl border object-cover object-top shadow-2xl md:aspect-video dark:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
