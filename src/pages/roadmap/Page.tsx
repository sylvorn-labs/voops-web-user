import { Compass, CheckCircle2, Clock, Sparkles } from 'lucide-react';

import { ResourceLayout } from '@/layouts/resource/ResourceLayout';

export function RoadmapPage() {
  return (
    <ResourceLayout
      title="Product Road Map"
      subtitle="Discover what we're building next at Sylvorn Labs for Voops."
      badge="Product & Innovation"
      sidebar={{
        badgeLabel: 'Public Roadmap',
        badgeIcon: <Compass className="mr-2 size-3.5" />,
        cardTitle: 'Voops 2026-2027 Engineering Vision',
        cardDescription:
          'A transparent overview of completed releases, active developments, and planned upcoming features.',
        readTime: '4 minutes',
        pdfButtonText: 'Download Roadmap Summary',
        printButtonText: 'Print Roadmap',
      }}
    >
      <div className="space-y-10">
        {/* Overview / Introduction */}
        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Our Mission
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Voops is built to eliminate the chaos of managing finances across
            multiple businesses, ventures, and teams. Our roadmap is driven
            directly by community feedback, open-source contributors, and the
            daily workflow demands of founders and operators.
          </p>
        </section>

        {/* Q3 2026 - Completed / Stable */}
        <section className="border-border/60 bg-card rounded-2xl border p-6 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="bg-income/10 text-income inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <CheckCircle2 className="size-3.5" />
              Completed / Stable
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Q3 2026
            </span>
          </div>
          <h3 className="text-foreground mt-3 text-xl font-bold">
            Multi-Business Core & Modern Foundation
          </h3>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">
                Multi-Business Architecture:
              </strong>{' '}
              Single user authentication with instantaneous switching between
              independent business workspaces.
            </li>
            <li>
              <strong className="text-foreground">Modern Design System:</strong>{' '}
              Radix UI + Tailwind v4 component suite with smooth dark/light
              theme switching.
            </li>
            <li>
              <strong className="text-foreground">
                Project & Category Tracking:
              </strong>{' '}
              Assign expenses to discrete projects, people, and expense
              categories.
            </li>
            <li>
              <strong className="text-foreground">Team Role Hierarchy:</strong>{' '}
              Granular permissions for workspace owners, admins, members, and
              viewers.
            </li>
          </ul>
        </section>

        {/* Q4 2026 - In Progress */}
        <section className="border-border/60 bg-card rounded-2xl border p-6 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <Clock className="size-3.5" />
              In Active Development
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Q4 2026
            </span>
          </div>
          <h3 className="text-foreground mt-3 text-xl font-bold">
            Smart Automation & Insights
          </h3>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">AI Receipt OCR:</strong>{' '}
              Drag-and-drop receipt extraction to automatically fill vendor,
              tax, amount, and line items.
            </li>
            <li>
              <strong className="text-foreground">
                Automated Recurring Transactions:
              </strong>{' '}
              Schedule recurring subscriptions, payroll runs, and recurring
              invoice entries.
            </li>
            <li>
              <strong className="text-foreground">
                Interactive Cash-Flow Projections:
              </strong>{' '}
              Visual graphs forecasting monthly burn rate and runway across all
              businesses.
            </li>
            <li>
              <strong className="text-foreground">
                Direct CSV / QBO Importer:
              </strong>{' '}
              One-click migration from QuickBooks, Wave, and bank statements.
            </li>
          </ul>
        </section>

        {/* Q1-Q2 2027 - Planned */}
        <section className="border-border/60 bg-card rounded-2xl border p-6 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="bg-muted text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <Sparkles className="size-3.5" />
              Planned
            </span>
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Q1 - Q2 2027
            </span>
          </div>
          <h3 className="text-foreground mt-3 text-xl font-bold">
            Mobile Ecosystem & Developer Platform
          </h3>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">
                Flutter iOS & Android Mobile Apps:
              </strong>{' '}
              Fast offline-first mobile apps for real-time receipt scanning on
              the go.
            </li>
            <li>
              <strong className="text-foreground">
                Public Developer REST & Webhook APIs:
              </strong>{' '}
              Programmatically sync transactions from custom payment gateways
              and internal ERPs.
            </li>
            <li>
              <strong className="text-foreground">
                Audit-Ready Tax Packs:
              </strong>{' '}
              Generate consolidated PDF / Excel year-end packages tailored for
              accountants.
            </li>
            <li>
              <strong className="text-foreground">
                Multi-Currency Live FX:
              </strong>{' '}
              Instant auto-conversion for international transactions with
              real-time exchange rates.
            </li>
          </ul>
        </section>

        {/* Feedback / Suggestions */}
        <section className="border-border/60 bg-muted/30 rounded-2xl border p-6">
          <h3 className="text-foreground text-lg font-bold">
            Have a Feature Request?
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            We build Voops in the open. If you have an idea for a feature,
            integration, or improvement, participate in our discussions on{' '}
            <a
              href="https://github.com/sylvorn-labs"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary font-semibold underline"
            >
              GitHub
            </a>{' '}
            or reach out directly at{' '}
            <a
              href="mailto:roadmap@sylvorn.com"
              className="text-primary font-semibold underline"
            >
              roadmap@sylvorn.com
            </a>
            .
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
}
