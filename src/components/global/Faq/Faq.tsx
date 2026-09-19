import { cn } from 'cn';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion/accordion';
import { defaultFaqItems } from './Faq.constants';
import type { FaqProps } from './Faq.d';

export function Faq({
  id = 'faq',
  heading = 'Frequently Asked Questions',
  description = 'Everything you need to know about managing multiple businesses, teams, and expenses with Voops.',
  items = defaultFaqItems,
  className,
}: FaqProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            {description && (
              <p className="text-muted-foreground text-base text-balance sm:text-lg">
                {description}
              </p>
            )}
          </div>

          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={item.id || index} value={`item-${index}`}>
                <AccordionTrigger className="text-foreground py-5 text-left text-base font-semibold transition-colors hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
