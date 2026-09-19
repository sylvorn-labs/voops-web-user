import { useParams, Link } from 'react-router';
import {
  SparklesIcon,
  ArrowLeft01Icon,
  Idea01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { BlogPostLayout } from '@/layouts/blog/BlogPostLayout';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/Alert';
import { Button } from '@/components/ui/button/Button';
import { Community } from '@/components/global/community/Community';
import { Download } from '@/components/global/download/Download';
import { defaultBlogPosts } from '../components/blog/blog.constants';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = defaultBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl">
          <HugeiconsIcon icon={SparklesIcon} className="size-7" />
        </div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          Article Not Found
        </h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base">
          The blog post you are looking for doesn&apos;t exist or might have
          been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              Return to Blog Index
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogPostLayout
        title={post.title}
        description={post.summary}
        author={post.author}
        image={post.image}
        pubDate={post.pubDate}
      >
        <h2>Architectural Foundations & Best Practices</h2>
        <p>
          Managing expense tracking across multiple ventures, subsidiaries, and
          client projects traditionally requires clunky enterprise software or
          precarious arrays of disconnected spreadsheets. With Voops,
          organizations unify their financial workflows while maintaining strict
          partition boundaries between independent legal entities.
        </p>

        <h2>How Voops Handles Multi-Entity Ledgers</h2>
        <p>
          When managing independent legal entities under a single founder
          account, ensuring data isolation and clear audit trails is critical.
          Voops isolates workspaces cryptographically while allowing instant
          one-click context switches in the navigation bar.
        </p>

        <Alert className="my-6">
          <HugeiconsIcon icon={Idea01Icon} className="size-4" />
          <AlertTitle>Pro-Tip for Operators</AlertTitle>
          <AlertDescription>
            You can invite external fractional CFOs and accountants to specific
            business workspaces with read-only auditor permissions, keeping
            other entity ledgers completely confidential.
          </AlertDescription>
        </Alert>

        <h2>Feature & Workflow Comparison</h2>
        <p>
          Here is how modern open-source tracking compares against legacy
          accounting tools:
        </p>

        <div className="my-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-border border-b">
                <th className="text-foreground p-3 font-bold">
                  Operational Dimension
                </th>
                <th className="text-foreground p-3 font-bold">
                  Legacy Enterprise Tools
                </th>
                <th className="text-foreground p-3 font-bold">
                  Voops Modern Stack
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-border border-b">
                <td className="p-3 font-medium">Multi-Business Switching</td>
                <td className="text-muted-foreground p-3">
                  Multiple logins required
                </td>
                <td className="text-primary p-3 font-medium">
                  Instant workspace switcher
                </td>
              </tr>
              <tr className="border-border bg-muted/30 border-b">
                <td className="p-3 font-medium">Receipt OCR & Parsing</td>
                <td className="text-muted-foreground p-3">
                  Slow batch processing
                </td>
                <td className="text-primary p-3 font-medium">
                  Instant client-side OCR
                </td>
              </tr>
              <tr className="border-border border-b">
                <td className="p-3 font-medium">Project P&L Attribution</td>
                <td className="text-muted-foreground p-3">
                  Expensive add-on modules
                </td>
                <td className="text-primary p-3 font-medium">
                  Built-in per-project tracking
                </td>
              </tr>
              <tr className="border-border bg-muted/30 border-b">
                <td className="p-3 font-medium">
                  Data Sovereignty & Open Code
                </td>
                <td className="text-muted-foreground p-3">
                  Proprietary vendor lock-in
                </td>
                <td className="text-primary p-3 font-medium">
                  100% Open source MIT license
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Scaling Collaboration Safely</h2>
        <p>
          As your team grows, permissions can be tailored according to team
          responsibilities:
        </p>
        <ul>
          <li>
            <strong>Owner & Admin:</strong> Full access to banking feeds,
            account settings, and workspace members.
          </li>
          <li>
            <strong>Finance Manager:</strong> Can approve expense submissions,
            categorize transactions, and reconcile statements.
          </li>
          <li>
            <strong>Team Member:</strong> Can upload receipts and view
            transactions assigned specifically to their active projects.
          </li>
          <li>
            <strong>Auditor / Accountant:</strong> Read-only access for
            generating year-end tax packs and balance sheets.
          </li>
        </ul>

        <blockquote>
          &ldquo;Simplifying financial operations allows founders to focus on
          product velocity rather than reconciliation nightmares at tax
          time.&rdquo;
        </blockquote>

        <p>
          Ready to streamline your financial operations? Explore our interactive
          documentation or try out the demo workspace today.
        </p>
      </BlogPostLayout>

      <Download />
      <Community />
    </>
  );
}
