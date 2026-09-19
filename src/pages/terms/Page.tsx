import { ShieldCheck } from 'lucide-react';

import { ResourceLayout } from '@/layouts/resource/ResourceLayout';

export function TermsPage() {
  return (
    <ResourceLayout
      title="Terms & Conditions"
      subtitle="Last updated: September 19, 2026 • Effective Date: January 1, 2026"
      badge="Legal & Compliance"
      sidebar={{
        badgeLabel: 'Legal Terms',
        badgeIcon: <ShieldCheck className="mr-2 size-3.5" />,
        cardTitle: 'Voops Master Terms of Service',
        cardDescription:
          'Official terms governing your use of Voops multi-business financial tracking applications and cloud services.',
        readTime: '6 minutes',
        pdfButtonText: 'Export PDF Agreement',
        printButtonText: 'Print Terms',
      }}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            By creating an account, accessing, or using Voops
            (&quot;Service&quot;, &quot;Platform&quot;), operated by Sylvorn
            Labs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree
            to be bound by these Terms and Conditions. If you do not agree with
            any part of these terms, you may not access or use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            2. Scope of Service & Multi-Business Accounts
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Voops provides multi-entity expense tracking, financial
            categorization, team role management, and analytical reporting
            tools. You may create or join multiple business workspaces under a
            single user authentication identity.
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
            4. Open Source & Commercial Usage
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Portions of the Voops software suite are distributed under
            permissive open-source licenses by Sylvorn Labs. Managed cloud
            services, hosted synchronization endpoints, automated backups, and
            proprietary analytical features are subject to our hosted service
            tier guidelines and fair usage policies.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            5. Limitation of Liability & Financial Disclaimer
          </h2>
          <blockquote className="border-border/60 bg-muted/30 border-l-primary my-4 rounded-r-lg border-l-4 p-4 text-sm italic">
            Voops is an expense tracking and financial analysis utility. Voops
            and Sylvorn Labs do not provide certified financial, accounting,
            legal, or tax advice. Always consult a qualified professional for
            regulatory compliance and audit filings.
          </blockquote>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            To the maximum extent permitted by applicable law, Sylvorn Labs
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from loss of profits,
            data corruption, or business disruption.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            6. Account Termination & Data Export
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            You may terminate your account at any time. Prior to account
            closure, you have the right to export all workspace transaction
            records and receipts in open formats (JSON/CSV). Upon termination,
            your active access will cease in accordance with our retention
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            7. Modifications to Terms
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            We reserve the right to revise or update these terms at our
            discretion. Notice of material changes will be provided via platform
            notifications or by updating the revision date at the top of this
            document.
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
