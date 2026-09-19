import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
}

export interface ChangelogProps {
  id?: string;
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
  className?: string;
}

const defaultEntries: ChangelogEntry[] = [
  {
    version: 'v1.3.0',
    date: '18 September 2026',
    title: 'Multi-Business Master Dashboards & Project P&L',
    description:
      'A landmark update introducing multi-entity aggregation, sub-second project profit & loss calculations, and audit-ready data export.',
    items: [
      'Multi-business workspace switching with dedicated bank accounts',
      'Interactive project milestone tracking and margin analysis',
      'Direct CSV, Excel, and PDF tax report generation',
      'Advanced category intelligence and recurring SaaS subscription alerts',
      'Improved dark & light mode token performance',
    ],
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg',
    button: {
      url: 'https://github.com/sylvorn-labs',
      text: 'View Release Notes on GitHub',
    },
  },
  {
    version: 'v1.2.0',
    date: '20 August 2026',
    title: 'Flutter Mobile Companion Launch (iOS & Android)',
    description:
      'We officially launched our native Flutter companion apps for fast on-the-go expense capture and real-time Supabase cloud synchronization.',
    items: [
      'Instant offline receipt and expense logging with automatic sync',
      'Biometric authentication support (FaceID and Fingerprint)',
      'Sub-second real-time sync with desktop React workspace',
      'Granular camera receipt uploads and PDF attachment viewer',
    ],
  },
  {
    version: 'v1.1.0',
    date: '15 July 2026',
    title: 'Granular Role-Based Permissions & Audit Trails',
    description:
      'Added full team collaboration capabilities allowing business owners to invite members, accountants, and managers with custom permission scopes.',
    items: [
      'Owner, Admin, Member, and View-only role hierarchy',
      'Comprehensive ledger audit trail tracking every modification',
      'Protected balance hiding for standard team members',
      'Automated email invitations and membership management',
    ],
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg',
  },
  {
    version: 'v1.0.0',
    date: '10 June 2026',
    title: 'Official Voops Open-Source Public Release',
    description:
      'Initial public release of Voops by Sylvorn Labs. Built to give founders and operators an open-source, multi-entity financial tracking platform without paywalls.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-aspect-video-1.svg',
    button: {
      url: 'https://github.com/sylvorn-labs',
      text: 'Read Announcement',
    },
  },
];

export function Changelog({
  id = 'changelog',
  title = 'Product Changelog',
  description = 'Discover the latest releases, performance improvements, and feature updates shipped by the Sylvorn Labs team.',
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
            <div
              key={index}
              className="relative flex flex-col gap-6 md:flex-row md:gap-14"
            >
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
                      <HugeiconsIcon
                        icon={ArrowUpRight01Icon}
                        className="size-4"
                      />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Changelog as Changelog1 };
