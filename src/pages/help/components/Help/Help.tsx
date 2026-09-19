import { Link } from 'react-router';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button/Button';
import { defaultCategories, defaultTopics } from './help.constants';
import type { HelpProps } from './help.d';
import { HelpCategoryCard } from './HelpCategoryCard';

export function Help({
  id = 'help',
  title = 'Voops Help Center',
  description = 'Everything you need to master multi-business expense tracking, project P&L, and team collaboration.',
  categories = defaultCategories,
  popularTopics = defaultTopics,
  contactButtonText = 'Contact Support & Community',
  contactUrl = '/#contact',
  className,
}: HelpProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            {description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <HelpCategoryCard key={index} category={category} />
          ))}
        </div>

        {/* Popular Topics Box */}
        <div className="border-border/60 bg-muted/40 rounded-2xl border p-6 sm:p-8">
          <h2 className="text-foreground mb-4 text-lg font-bold">
            Frequently Explored Topics
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic, index) => (
              <a
                key={index}
                href={topic.href}
                className="hover:bg-card hover:text-foreground text-muted-foreground flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors"
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="text-primary size-3.5 shrink-0"
                />
                <span className="truncate">{topic.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Can&apos;t find what you&apos;re looking for or need help with a
            custom integration?
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link to={contactUrl}>{contactButtonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
