import { ResourceLayout } from '@/components/global/ResourceLayout';

interface Resource1Props {
  className?: string;
}

export function Resource1({ className }: Resource1Props) {
  return (
    <ResourceLayout
      className={className}
      title="The Complete Guide to Multi-Business Financial Tracking"
      subtitle="Written by Sylvorn Labs Engineering"
      sidebar={{
        badgeLabel: 'Whitepaper',
        cardTitle: 'The Complete Guide to Launching & Operating Your Startup',
        cardDescription:
          'Master entity isolation, real-time ledger synchronization, and proactive expense control.',
        readTime: '5 minutes',
        pdfButtonText: 'PDF Format',
        printButtonText: 'Print Version',
      }}
    >
      <div className="space-y-6">
        <p>
          Managing finances across multiple projects or separate business
          entities has traditionally required juggling multiple disparate
          software subscriptions, complex spreadsheets, and manual end-of-month
          reconciliations.
        </p>

        <h2>The Unified Architecture Plan</h2>
        <p>
          With Voops, each business workspace operates in an isolated
          environment with dedicated ledger tracking, custom categorization
          schemas, and role-based permissions—all under one unified user login.
        </p>

        <blockquote>
          &ldquo;Financial visibility shouldn&apos;t require sacrificing speed.
          Track every dollar, across every entity, in real time.&rdquo;
        </blockquote>

        <h3>Key Multi-Business Capabilities</h3>
        <ul>
          <li>
            <strong>Zero Context Switching:</strong> Seamlessly pivot across
            organizations without logging out.
          </li>
          <li>
            <strong>Role-Based Access Control:</strong> Invite team members with
            tailored admin, editor, or viewer scopes.
          </li>
          <li>
            <strong>Category & Project Tagging:</strong> Attribute every
            transaction to its specific venture and project milestone.
          </li>
        </ul>

        <div>
          <table>
            <thead>
              <tr>
                <th>Management Method</th>
                <th>Reconciliation Time</th>
                <th>Entity Isolation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Manual Spreadsheets</td>
                <td>Hours / Days</td>
                <td>High Error Risk</td>
              </tr>
              <tr>
                <td>Disparate Point Solutions</td>
                <td>Moderate</td>
                <td>Fragmented Logins</td>
              </tr>
              <tr>
                <td>Voops Multi-Business</td>
                <td>Real-time</td>
                <td>Cryptographic RLS Isolation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ResourceLayout>
  );
}
