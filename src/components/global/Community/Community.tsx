import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button/Button';
import { defaultSocialLinks } from './community.constants';
import type { CommunityProps } from './community.d';

export function Community({
  id = 'community',
  logo,
  heading = 'Join our global community',
  headingHighlight = 'of founders, builders & operators',
  socialLinks = defaultSocialLinks,
  className,
}: CommunityProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          {logo ?? (
            <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-2xl shadow-sm">
              <HugeiconsIcon icon={SparklesIcon} className="size-6" />
            </div>
          )}

          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
            <br />
            <span className="text-muted-foreground text-2xl font-medium sm:text-3xl lg:text-4xl">
              {headingHighlight}
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 pt-2">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                size="icon"
                variant="outline"
                asChild
                className="border-border hover:bg-muted/60 size-12 rounded-2xl transition-transform hover:scale-105"
                aria-label={link.name}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-center"
                >
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
