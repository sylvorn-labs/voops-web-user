import {
  Call02Icon,
  Comment01Icon,
  Location01Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { defaultContactValues } from './contact.constants';
import type { ContactProps } from './contact.d';

export function Contact({
  id = defaultContactValues.id,
  title = defaultContactValues.title,
  description = defaultContactValues.description,
  emailLabel = defaultContactValues.emailLabel,
  emailDescription = defaultContactValues.emailDescription,
  email = defaultContactValues.email,
  officeLabel = defaultContactValues.officeLabel,
  officeDescription = defaultContactValues.officeDescription,
  officeAddress = defaultContactValues.officeAddress,
  phoneLabel = defaultContactValues.phoneLabel,
  phoneDescription = defaultContactValues.phoneDescription,
  phone = defaultContactValues.phone,
  chatLabel = defaultContactValues.chatLabel,
  chatDescription = defaultContactValues.chatDescription,
  chatLink = defaultContactValues.chatLink,
  chatUrl = defaultContactValues.chatUrl,
  className,
}: ContactProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 md:mb-16">
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              {description}
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Support Email */}
            <div className="border-border/60 bg-card text-card-foreground flex flex-col rounded-2xl border p-8 shadow-xs transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-5 flex size-12 items-center justify-center rounded-xl">
                <HugeiconsIcon icon={Mail01Icon} className="size-6" />
              </div>
              <p className="text-foreground text-lg font-bold">{emailLabel}</p>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                {emailDescription}
              </p>
              <a
                href={`mailto:${email}`}
                className="text-primary hover:text-primary/80 mt-auto text-sm font-semibold transition-colors hover:underline"
              >
                {email}
              </a>
            </div>

            {/* Office Address */}
            <div className="border-border/60 bg-card text-card-foreground flex flex-col rounded-2xl border p-8 shadow-xs transition-shadow hover:shadow-md">
              <div className="bg-income/10 text-income mb-5 flex size-12 items-center justify-center rounded-xl">
                <HugeiconsIcon icon={Location01Icon} className="size-6" />
              </div>
              <p className="text-foreground text-lg font-bold">{officeLabel}</p>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                {officeDescription}
              </p>
              <span className="text-foreground mt-auto text-sm font-semibold">
                {officeAddress}
              </span>
            </div>

            {/* General Contact Email */}
            <div className="border-border/60 bg-card text-card-foreground flex flex-col rounded-2xl border p-8 shadow-xs transition-shadow hover:shadow-md">
              <div className="bg-warning/10 text-warning mb-5 flex size-12 items-center justify-center rounded-xl">
                <HugeiconsIcon icon={Call02Icon} className="size-6" />
              </div>
              <p className="text-foreground text-lg font-bold">{phoneLabel}</p>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                {phoneDescription}
              </p>
              <a
                href={`mailto:${phone}`}
                className="text-primary hover:text-primary/80 mt-auto text-sm font-semibold transition-colors hover:underline"
              >
                {phone}
              </a>
            </div>

            {/* Live Chat / GitHub Community */}
            <div className="border-border/60 bg-card text-card-foreground flex flex-col rounded-2xl border p-8 shadow-xs transition-shadow hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-5 flex size-12 items-center justify-center rounded-xl">
                <HugeiconsIcon icon={Comment01Icon} className="size-6" />
              </div>
              <p className="text-foreground text-lg font-bold">{chatLabel}</p>
              <p className="text-muted-foreground mt-1 mb-6 text-sm">
                {chatDescription}
              </p>
              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary hover:text-primary/80 mt-auto inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
              >
                <span>{chatLink}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
