import { cn } from 'cn';

import { defaultEntries } from './changelog.constants';
import type { ChangelogProps } from './changelog.d';
import { ChangelogEntryItem } from './ChangelogEntryItem';

export function Changelog({
  id = 'changelog',
  title = 'Project Timeline & Changelog',
  description = 'A transparent record of our journey from initial problem statement and architecture brainstorming to active mobile and web development.',
  entries = defaultEntries,
  className,
}: ChangelogProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => (
            <ChangelogEntryItem key={index} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
