import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight01Icon,
  Building03Icon,
  FlashIcon,
  Folder02Icon,
  Tag01Icon,
  UserGroupIcon,
  Wallet02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export interface HelpCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  articles: number;
  href?: string;
}

export interface PopularTopic {
  title: string;
  href: string;
}

export interface HelpProps {
  id?: string;
  title?: string;
  description?: string;
  categories?: HelpCategory[];
  popularTopics?: PopularTopic[];
  contactButtonText?: string;
  contactUrl?: string;
  className?: string;
}

const defaultCategories: HelpCategory[] = [
  {
    icon: (
      <HugeiconsIcon icon={Building03Icon} className="text-primary size-5" />
    ),
    title: 'Multi-Business Setup',
    description:
      'Create, isolate, and switch across multiple company workspaces.',
    articles: 8,
    href: '#',
  },
  {
    icon: (
      <HugeiconsIcon icon={UserGroupIcon} className="text-primary size-5" />
    ),
    title: 'Team & Permissions',
    description:
      'Invite members, assign roles, and configure view-only access.',
    articles: 10,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Wallet02Icon} className="text-primary size-5" />,
    title: 'Accounts & Banking',
    description:
      'Manage bank accounts, cash registers, and multi-currency balances.',
    articles: 6,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Folder02Icon} className="text-primary size-5" />,
    title: 'Project Budgets & P&L',
    description:
      'Track client milestones, calculate real margins, and log payouts.',
    articles: 9,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={Tag01Icon} className="text-primary size-5" />,
    title: 'Categories & Tax Tags',
    description:
      'Organize expenses, automate write-offs, and generate tax reports.',
    articles: 12,
    href: '#',
  },
  {
    icon: <HugeiconsIcon icon={FlashIcon} className="text-income size-5" />,
    title: 'Mobile Sync & Flutter',
    description:
      'Sync real-time receipts between Flutter mobile apps and React web.',
    articles: 7,
    href: '#',
  },
];

const defaultTopics: PopularTopic[] = [
  { title: 'How do I add a second business entity?', href: '#' },
  { title: 'Inviting an external accountant with read-only access', href: '#' },
  { title: 'Exporting audit-ready CSV & PDF tax reports', href: '#' },
  { title: 'Connecting Flutter mobile app with Supabase cloud', href: '#' },
  { title: 'Configuring project milestone budgets and P&L', href: '#' },
  { title: 'Resetting 2FA or changing workspace owner email', href: '#' },
];

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
            <Card
              key={index}
              className="border-border/60 bg-card text-card-foreground group hover:border-border hover:bg-muted/40 cursor-pointer rounded-2xl border p-0 shadow-xs transition-all duration-200 hover:shadow-md"
            >
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

export { Help as Help1 };
