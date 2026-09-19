import { Link } from 'react-router';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Badge } from '@/components/ui/badge/Badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card/Card';
import type { BlogCardProps } from './blog-card.d';

export function BlogCard({ post, className }: BlogCardProps) {
  const isInternal = post.url.startsWith('/') && !post.url.startsWith('/#');

  const CardImage = (
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );

  return (
    <Card
      className={cn(
        'group grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0 transition-shadow duration-200 hover:shadow-md',
        className,
      )}
    >
      {isInternal ? (
        <Link to={post.url} className="overflow-hidden">
          {CardImage}
        </Link>
      ) : (
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer noopener"
          className="overflow-hidden"
        >
          {CardImage}
        </a>
      )}

      <CardHeader>
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {post.label}
          </Badge>
        </div>
        <h3 className="text-foreground group-hover:text-primary text-xl font-semibold tracking-tight transition-colors">
          {isInternal ? (
            <Link to={post.url}>{post.title}</Link>
          ) : (
            <a href={post.url} target="_blank" rel="noreferrer noopener">
              {post.title}
            </a>
          )}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm font-medium">
          {post.author.name} · {post.published}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
          {post.summary}
        </p>
      </CardContent>

      <CardFooter>
        {isInternal ? (
          <Link
            to={post.url}
            className="text-muted-foreground group-hover:text-primary inline-flex items-center text-sm font-medium transition-colors"
          >
            Read more
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="ml-1 size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        ) : (
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted-foreground group-hover:text-primary inline-flex items-center text-sm font-medium transition-colors"
          >
            Read more
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="ml-1 size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
