import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import type { ChangelogEntryItemProps } from './changelog-entry-item.d';

export function ChangelogEntryItem({ entry }: ChangelogEntryItemProps) {
  return (
    <div className="relative flex flex-col gap-6 md:flex-row md:gap-14">
      {/* Sticky Meta Column */}
      <div className="top-24 flex h-min w-60 shrink-0 items-center gap-3 md:sticky">
        <Badge variant="secondary" className="text-xs font-semibold">
          {entry.version}
        </Badge>
        <span className="text-muted-foreground text-xs font-medium">
          {entry.date}
        </span>
      </div>

      {/* Main Content Column */}
      <div className="border-border/60 bg-card text-card-foreground flex flex-1 flex-col rounded-2xl border p-6 shadow-xs sm:p-8">
        <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
          {entry.title}
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
          {entry.description}
        </p>

        {entry.items && entry.items.length > 0 && (
          <ul className="text-muted-foreground mt-5 list-disc space-y-2 pl-5 text-sm">
            {entry.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        )}

        {entry.image && (
          <img
            src={entry.image}
            alt={`${entry.version} release showcase`}
            className="border-border/60 mt-6 w-full rounded-xl border object-cover shadow-xs"
          />
        )}

        {entry.button && (
          <Button
            variant="link"
            className="text-primary hover:text-primary/80 mt-6 self-start p-0 text-sm font-semibold"
            asChild
          >
            <a
              href={entry.button.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5"
            >
              <span>{entry.button.text}</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
