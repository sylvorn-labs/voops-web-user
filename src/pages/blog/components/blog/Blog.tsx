import { cn } from 'cn';

import { Badge } from '@/components/ui/badge/Badge';
import { BlogCard } from './BlogCard';
import { defaultBlogPosts } from './blog.constants';
import type { BlogProps } from './blog.d';

export function Blog({
  id = 'blog',
  tagline = 'Voops Insights & Articles',
  heading = 'Financial Clarity for Multi-Venture Operators',
  description = 'Discover best practices, release breakdowns, and architectural guides on multi-business accounting, real-time expense tracking, and modern financial workflows.',
  posts = defaultBlogPosts,
  className,
}: BlogProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto flex flex-col items-center gap-12 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            {tagline}
          </Badge>
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight text-pretty sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
