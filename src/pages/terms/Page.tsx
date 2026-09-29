import { ResourceLayout } from '@/layouts/resource/ResourceLayout';
import { termsSidebarConfig } from './page.constants';

export function TermsPage() {
  return (
    <ResourceLayout
      title="Terms & Conditions"
      subtitle="Last updated: September 29, 2026 • Effective Date: January 1, 2026"
      badge="Legal & Compliance"
      sidebar={termsSidebarConfig}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            1. Acceptance of Terms & Public Beta Notice
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            By creating an account, accessing, or using Voops
            (&quot;Service&quot;, &quot;Platform&quot;), operated by Sylvorn
            Labs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree
            to be bound by these Terms and Conditions. The platform is currently
            operating in <strong>Public Beta</strong>. Features, sync protocols,
            and interfaces are continuously iterated and optimized. If you do
            not agree with any part of these terms, you may not access or use
            the platform.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            2. Scope of Service & Multi-Business Accounts
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Voops provides multi-entity expense tracking, financial
            categorization, team role management, and analytical reporting
            tools. All accounts created are live registered user workspaces;
            Voops does not offer unauthenticated public demo sandboxes. You may
            create or join multiple business workspaces under a single user
            authentication identity.
          </p>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong className="text-foreground">Workspace Ownership:</strong>{' '}
              The individual or entity that registers a workspace is the primary
              administrator and responsible for all transactions recorded within
              that workspace.
            </li>
            <li>
              <strong className="text-foreground">Team Permissions:</strong>{' '}
              Workspace administrators may assign roles (e.g. Owner, Admin,
              Member, Viewer). Administrators are responsible for maintaining
              accurate permission sets.
            </li>
            <li>
              <strong className="text-foreground">
                Accuracy of Financial Data:
              </strong>{' '}
              You acknowledge that you are solely responsible for verifying the
              accuracy of transaction entries, receipts, category allocations,
              and tax calculations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            3. User Responsibilities & Security
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            To protect your business data and account integrity, you agree to:
          </p>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
            <li>
              Maintain the confidentiality of your authentication credentials
              and session tokens.
            </li>
            <li>
              Promptly notify us of any suspected unauthorized access or
              security breach.
            </li>
            <li>
              Refrain from attempting to reverse-engineer, exploit, or bypass
              workspace isolation controls.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            4. Limited-Time Open Source Beta & Intellectual Property
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            The software source code for Voops is made available on GitHub under
            a <strong>limited-time open-source model</strong> strictly for the
            duration of the Public Beta evaluation phase. Sylvorn Labs retains
            all proprietary rights, patents, trademarks, and trade dress
            associated with Voops.
          </p>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Sylvorn Labs reserves the absolute and unencumbered right to amend,
            restrict, or transition source code licensing models (including
            transitioning future releases, managed cloud instances, enterprise
            modules, and automated sync infrastructure to commercial,
            dual-license, or source-available frameworks) upon conclusion of or
            during the Public Beta. Participation in the beta does not convey
            any perpetual commercial exploitation rights, nor does it guarantee
            perpetual open-source availability of subsequent software versions.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            5. Limitation of Liability & &quot;AS IS&quot; Disclaimer
          </h2>
          <blockquote className="border-border/60 bg-muted/30 border-l-primary my-4 rounded-r-lg border-l-4 p-4 text-sm italic">
            Voops is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis during Public Beta. Voops and Sylvorn Labs do
            not provide certified financial, accounting, legal, or tax advisory
            services. Always verify all calculations and consult a certified
            public accountant (CPA) or licensed legal professional for
            regulatory tax filings.
          </blockquote>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            To the maximum extent permitted by applicable law, Sylvorn Labs
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from loss of profits,
            data corruption, system downtime, sync delays, or business
            disruption occurring during or in connection with the beta service.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            6. Account Termination & Data Export Guarantee
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            You may terminate your account at any time. Regardless of future
            licensing transitions, you retain complete ownership over your
            financial transaction records, receipts, and ledger files. Prior to
            account closure or during normal usage, you possess the unencumbered
            right to export all workspace transaction records and receipts in
            standard open formats (JSON/CSV).
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            7. Modifications to Terms & Platform Evolution
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            We reserve the right to revise or update these terms and service
            tier structures at our discretion. Notice of material changes will
            be communicated via platform announcements, email notifications, or
            by updating the revision date at the top of this document.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            8. Contact Information
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            For questions or inquiries regarding these Terms and Conditions,
            please contact Sylvorn Labs at{' '}
            <a
              href="mailto:hello@labs.sylvorn.com"
              className="text-primary underline"
            >
              hello@labs.sylvorn.com
            </a>{' '}
            or write to us at 123-124, Golden Plaza, Tagore Road, Rajkot -
            360002, Gujarat, India.
          </p>
        </section>
      </div>
    </ResourceLayout>
  );
}
