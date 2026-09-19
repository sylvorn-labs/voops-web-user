import { Link } from 'react-router';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar';
import type { BlogPostLayoutProps } from './blog-post-layout.d';

export function BlogPostLayout({
  title,
  description,
  author,
  image,
  pubDate,
  backLink = '/blog',
  backLabel = 'Back to all articles',
  children,
  className,
}: BlogPostLayoutProps) {
  const formattedDate =
    typeof pubDate === 'string' && isNaN(Date.parse(pubDate)) === false
      ? new Date(pubDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : pubDate instanceof Date
        ? pubDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : String(pubDate);

  return (
    <article className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mx-auto mb-8 max-w-5xl">
          <Link
            to={backLink}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Centered Hero Header */}
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="text-foreground max-w-4xl text-3xl font-bold tracking-tight text-pretty sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              {description}
            </p>
          )}

          {/* Author Details Row */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Avatar className="size-8 border">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-foreground font-semibold">
                {author.name}
              </span>
            </div>

            {author.website && author.websiteName && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  Owner of{' '}
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-foreground hover:text-primary font-semibold underline underline-offset-4"
                  >
                    {author.websiteName}
                  </a>
                </span>
              </>
            )}

            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              Published on {formattedDate}
            </span>
          </div>

          {/* Featured Hero Image */}
          {image && (
            <div className="mt-6 mb-10 aspect-video w-full overflow-hidden rounded-2xl border">
              <img
                src={image}
                alt={title}
                className="size-full object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>

      {/* Prose Article Body */}
      <div className="container mx-auto px-4">
        <div className="prose dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline hover:prose-a:opacity-80 prose-hr:border-border/60 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-table:border-border prose-th:bg-muted/40 prose-th:p-3 prose-td:p-3 prose-td:border-border mx-auto max-w-3xl text-base leading-relaxed">
          {children}
        </div>
      </div>
    </article>
  );
}
