import * as React from 'react';
import { BookOpen, Download, Printer, Share2, Check, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { ResourceSidebarProps } from './ResourceSidebar.d';

export function ResourceSidebar({ sidebar, title }: ResourceSidebarProps) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    if (sidebar.onPrint) {
      sidebar.onPrint();
    } else {
      window.print();
    }
  };

  const handleCopyLink = () => {
    const url = sidebar.shareUrl || window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareUrl = encodeURIComponent(
    sidebar.shareUrl ||
      (typeof window !== 'undefined' ? window.location.href : ''),
  );
  const shareText = encodeURIComponent(
    title || sidebar.cardTitle || 'Check this out on Voops',
  );

  return (
    <div className="order-last lg:order-none lg:col-span-4 xl:col-span-3">
      <aside className="sticky top-24 flex flex-col gap-6">
        {/* Document Information Card */}
        <div className="border-border/60 bg-card overflow-hidden rounded-2xl border shadow-xs">
          <div className="border-border/60 bg-muted/40 flex items-center justify-between border-b px-5 py-3.5">
            <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-wider uppercase">
              {sidebar.badgeIcon || <BookOpen className="mr-2 size-3.5" />}
              {sidebar.badgeLabel || 'Document'}
            </h3>
          </div>
          <div className="p-5">
            <div className="text-foreground text-base leading-snug font-bold">
              <p>{sidebar.cardTitle}</p>
            </div>
            {sidebar.cardDescription && (
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                {sidebar.cardDescription}
              </p>
            )}
          </div>
        </div>

        {/* Actions / Download Options */}
        <div className="border-border/60 bg-card overflow-hidden rounded-2xl border shadow-xs">
          <div className="border-border/60 bg-muted/40 flex items-center border-b px-5 py-3.5">
            <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-wider uppercase">
              <Download className="mr-2 size-3.5" />
              {sidebar.downloadLabel || 'Options & Export'}
            </h3>
          </div>
          <div className="space-y-4 p-5">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Save a copy for offline access, compliance documentation, or team
              review.
            </p>
            <div className="flex flex-col space-y-2.5">
              <Button
                className="w-full justify-between"
                variant="default"
                onClick={sidebar.onDownloadPdf || handlePrint}
              >
                <span>{sidebar.pdfButtonText || 'PDF Version'}</span>
                <Download className="size-4" />
              </Button>
              <Button
                className="w-full justify-between"
                variant="outline"
                onClick={handlePrint}
              >
                <span>{sidebar.printButtonText || 'Print Document'}</span>
                <Printer className="size-4" />
              </Button>
            </div>
            {sidebar.readTime && (
              <p className="text-muted-foreground pt-1 text-center text-xs">
                Estimated read time: {sidebar.readTime}
              </p>
            )}
          </div>
        </div>

        {/* Share Card */}
        <div className="border-border/60 bg-card overflow-hidden rounded-2xl border shadow-xs">
          <div className="border-border/60 bg-muted/40 flex items-center border-b px-5 py-3.5">
            <h3 className="text-muted-foreground flex items-center text-xs font-semibold tracking-wider uppercase">
              <Share2 className="mr-2 size-3.5" />
              {sidebar.shareTitle || 'Share this page'}
            </h3>
          </div>
          <div className="p-5">
            <ul className="flex items-center gap-2.5">
              <li>
                <a
                  href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-border/60 bg-muted/50 hover:bg-muted text-foreground flex size-9 items-center justify-center rounded-xl border transition-colors"
                  aria-label="Share on X"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-border/60 bg-muted/50 hover:bg-muted text-foreground flex size-9 items-center justify-center rounded-xl border transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="size-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="border-border/60 bg-muted/50 hover:bg-muted text-foreground flex size-9 items-center justify-center rounded-xl border transition-colors"
                  aria-label="Copy Link"
                  title="Copy Link"
                >
                  {copied ? (
                    <Check className="text-primary size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {sidebar.extraSidebarContent}
      </aside>
    </div>
  );
}
