import { Outlet } from 'react-router';
import { cn } from 'cn';

import type { ResourceLayoutProps } from './resource-layout.d';
import { ResourceSidebar } from './ResourceSidebar';

export function ResourceLayout({
  className,
  sidebar,
  title,
  subtitle,
  badge,
  children,
}: ResourceLayoutProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Sidebar */}
          {sidebar && <ResourceSidebar sidebar={sidebar} title={title} />}

          {/* Main Article Content */}
          <div
            className={cn(
              sidebar ? 'lg:col-span-8 xl:col-span-9' : 'col-span-12',
            )}
          >
            <article className="prose dark:prose-invert text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline hover:prose-a:opacity-80 prose-hr:border-border/60 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-table:border-border prose-th:bg-muted/40 prose-th:p-3 prose-td:p-3 prose-td:border-border max-w-none">
              {badge && (
                <div className="bg-primary/10 text-primary mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
                  {badge}
                </div>
              )}
              {title && (
                <h1 className="text-foreground mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground mb-8 text-sm font-medium">
                  {subtitle}
                </p>
              )}
              {children ?? <Outlet />}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
