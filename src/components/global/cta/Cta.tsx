import { Link } from 'react-router';
import { cn } from 'cn';

import { Button } from '@/components/ui/button/Button';
import { defaultCtaButtons } from './cta.constants';
import type { CtaButton, CtaProps } from './cta.d';

function renderButton(button: CtaButton, isPrimary = true) {
  const isInternal = button.url.startsWith('/') && !button.url.startsWith('/#');

  const variant = isPrimary ? 'default' : 'outline';

  if (isInternal) {
    return (
      <Button
        key={button.text}
        variant={variant}
        size="lg"
        className="w-full"
        asChild
      >
        <Link to={button.url}>
          {button.icon && <span className="mr-2">{button.icon}</span>}
          {button.text}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      key={button.text}
      variant={variant}
      size="lg"
      className="w-full"
      asChild
    >
      <a
        href={button.url}
        target={button.url.startsWith('http') ? '_blank' : undefined}
        rel={button.url.startsWith('http') ? 'noreferrer noopener' : undefined}
      >
        {button.icon && <span className="mr-2">{button.icon}</span>}
        {button.text}
      </a>
    </Button>
  );
}

export function Cta({
  id = 'cta',
  heading = 'Ready to streamline your multi-business expenses?',
  description = 'Join thousands of founders and operators tracking budgets, receipts, and cash flow in one open-source workspace.',
  buttons = defaultCtaButtons,
  className,
}: CtaProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="border-border/80 bg-card mx-auto grid max-w-5xl items-center gap-8 rounded-2xl border p-8 shadow-xs md:p-12 lg:grid-cols-3 lg:gap-16 lg:p-16">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {heading}
            </h2>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {buttons.primary && renderButton(buttons.primary, true)}
            {buttons.secondary && renderButton(buttons.secondary, false)}
          </div>
        </div>
      </div>
    </section>
  );
}
