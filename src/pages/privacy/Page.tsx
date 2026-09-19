import { Lock } from 'lucide-react';

import { ResourceLayout } from '@/layouts/resource/ResourceLayout';

export function PrivacyPage() {
  return (
    <ResourceLayout
      title="Privacy & Policy"
      subtitle="Last updated: September 19, 2026 • Privacy Commitment by Sylvorn Labs"
      badge="Data Protection & Privacy"
      sidebar={{
        badgeLabel: 'Privacy Notice',
        badgeIcon: <Lock className="mr-2 size-3.5" />,
        cardTitle: 'Voops Privacy & Security Charter',
        cardDescription:
          'How Voops and Sylvorn Labs collect, encrypt, isolate, and safeguard your personal and multi-business financial data.',
        readTime: '5 minutes',
        pdfButtonText: 'Download Policy PDF',
        printButtonText: 'Print Policy',
      }}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            1. Our Core Privacy Philosophy
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            At Sylvorn Labs, we believe your financial data belongs exclusively
            to you and your organization. Voops is designed from the ground up
            with strict tenant isolation, end-to-end transport encryption, and
            zero data monetization practices. We never sell your personal data
            or transaction history to advertisers or third-party brokers.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            2. Information We Collect
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            We only collect data strictly necessary to deliver a dependable
            multi-business expense tracking experience:
          </p>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Authentication Data:</strong>{' '}
              Name, email address, password hash, and OAuth identity identifiers
              (e.g. Google, GitHub) managed securely via Supabase Auth.
            </li>
            <li>
              <strong className="text-foreground">
                Business & Workspace Metadata:
              </strong>{' '}
              Business names, currency preferences, tax configurations, and
              member email invitations.
            </li>
            <li>
              <strong className="text-foreground">
                Transaction & Expense Records:
              </strong>{' '}
              Amounts, dates, vendors, category tags, project associations,
              attached receipt images, and optional audit notes.
            </li>
            <li>
              <strong className="text-foreground">
                Telemetry & Diagnostic Logs:
              </strong>{' '}
              Anonymized performance metrics and error logs used exclusively to
              diagnose application instability and optimize sync latency.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            3. How Your Data Is Stored & Encrypted
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Your data is stored within high-security PostgreSQL infrastructure
            with row-level security (RLS) enforcement on all database queries:
          </p>
          <div className="border-border/60 bg-muted/20 my-4 overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="border-border/60 bg-muted/40 border-b">
                <tr>
                  <th className="p-3 font-semibold">Data State</th>
                  <th className="p-3 font-semibold">Protection Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-border/40 divide-y">
                <tr>
                  <td className="p-3 font-medium">In Transit</td>
                  <td className="text-muted-foreground p-3">
                    TLS 1.3 encryption with strict HSTS headers
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">At Rest</td>
                  <td className="text-muted-foreground p-3">
                    AES-256 encrypted block storage and encrypted database
                    volumes
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Multi-Tenant Isolation</td>
                  <td className="text-muted-foreground p-3">
                    PostgreSQL Row-Level Security (RLS) scoped per workspace
                    UUID
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            4. Third-Party Service Providers
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            We partner only with vetted infrastructure providers essential for
            cloud availability and continuous operations:
          </p>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Supabase / AWS:</strong>{' '}
              Scalable cloud database hosting, real-time sync websockets, and
              object storage for receipts.
            </li>
            <li>
              <strong className="text-foreground">Vercel / Cloudflare:</strong>{' '}
              Global CDN edge routing and DDoS prevention.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            5. Your Privacy Rights & GDPR / CCPA Compliance
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Regardless of your geographic location, we provide comprehensive
            data autonomy rights:
          </p>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Right to Access:</strong> View
              all profile information and business records at any time directly
              through the application.
            </li>
            <li>
              <strong className="text-foreground">Right to Portability:</strong>{' '}
              Export your full transaction data in standard machine-readable CSV
              / JSON formats.
            </li>
            <li>
              <strong className="text-foreground">Right to Erasure:</strong>{' '}
              Request permanent deletion of your user profile and associated
              workspace data.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            6. Cookies & Tracking Technologies
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Voops uses strictly necessary authentication cookies and local
            storage items to preserve your active login session and UI theme
            preferences (Dark / Light mode). We do not load invasive third-party
            cross-site ad trackers.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            7. Contact the Privacy Team
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            If you have questions about this policy or wish to exercise your
            data protection rights, please reach out to{' '}
            <a
              href="mailto:support@labs.sylvorn.com"
              className="text-primary underline"
            >
              support@labs.sylvorn.com
            </a>
            .
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
}
