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
    version: 'Web Dev',
    date: '13 September 2026',
    title: 'Kick Started Web Application Development',
    description:
      'Commenced official React web application development with full Supabase integration, OAuth authentication, and multi-business workspace management.',
    items: [
      'Engineered React web frontend using modern web standards',
      'Integrated Supabase PostgreSQL database and real-time synchronization',
      'Implemented Row-Level Security (RLS) and authentication flows',
      'Built multi-business and multi-store money management interfaces',
    ],
    button: {
      url: 'https://github.com/Sylvorn-Labs/voops-web-user',
      text: 'View Web Repository',
    },
  },
  {
    version: 'Rebrand',
    date: '10 September 2026',
    title: 'Rebranded to Voops',
    description:
      'Transitioned from the initial working name "Expense Tracker" to our official brand "Voops" — inspired by our own problem statement: "Oops! There goes the money."',
    items: [
      'Formulated brand identity and tagline: "Oops! There goes the money."',
      'Unified design system and visual theme guidelines',
      'Established open-source product strategy under Sylvorn Labs',
    ],
  },
  {
    version: 'Mobile Dev',
    date: '31 August 2026',
    title: 'Kick Started Mobile Application Development',
    description:
      'Collaborated with Jaydeep Gohil to kick off cross-platform mobile application development using Flutter for iOS and Android.',
    items: [
      'Setup Flutter cross-platform architecture for iOS and Android',
      'Connected Supabase real-time client with local caching',
      'Designed frictionless daily transaction and receipt capture flows',
    ],
    button: {
      url: 'https://github.com/sylvorn-labs/voops-mobile-user',
      text: 'View Flutter Mobile Repo',
    },
  },
  {
    version: 'Planning',
    date: '26 - 30 August 2026',
    title: 'Planning & Architecture Brainstorming',
    description:
      'Brainstormed daily routines to eliminate friction and addressed core questions around timelines, maintenance, scale, and economics.',
    items: [
      'Selected Supabase for SQL Postgres, tried & tested OAuth, and RLS security',
      'Configured S3-compatible Object Storage for bills and invoices',
      'Designed schemas for multiple money stores (cash, wallets, bank accounts)',
      'Defined project P&L and multi-person transaction architectures',
    ],
  },
  {
    version: 'Conception',
    date: '20 - 25 August 2026',
    title: 'Idea Conception by Parth Kachhela',
    description:
      'Identified the critical need for a dedicated expense tracker after evaluating existing apps (including Khata book via AI search) that failed to match multi-business requirements.',
    items: [
      'Identified pain points in tracking multi-project incomes and expenses',
      'Addressed lack of clarity during client and outsourcing meetings',
      'Committed to building a lightweight, internal-first, open-source platform',
    ],
  },
];

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
