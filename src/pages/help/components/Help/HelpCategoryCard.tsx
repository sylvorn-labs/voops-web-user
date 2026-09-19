import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Card, CardContent } from '@/components/ui/card/Card';
import type { HelpCategoryCardProps } from './help-category-card.d';

export function HelpCategoryCard({ category }: HelpCategoryCardProps) {
  return (
    <Card className="border-border/60 bg-card text-card-foreground group hover:border-border hover:bg-muted/40 cursor-pointer rounded-2xl border p-0 shadow-xs transition-all duration-200 hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="border-border bg-background mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-xs">
            {category.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-foreground text-base font-bold tracking-tight">
                {category.title}
              </h3>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="text-muted-foreground group-hover:text-primary size-4 transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
              {category.description}
            </p>
            <p className="text-primary mt-2 text-xs font-semibold">
              {category.articles} articles
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
