import { Link, useNavigate } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  Home01Icon,
  SearchVisualIcon,
} from '@hugeicons/core-free-icons';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty/Empty';
import { Button } from '@/components/ui/button/Button';
import { cn } from '@/lib/utils';
import type { NotFoundPageProps } from './not-found.d';

export function NotFoundPage({ className }: NotFoundPageProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'container mx-auto flex min-h-[calc(100dvh-16rem)] items-center justify-center px-4 py-16',
        className,
      )}
    >
      <Empty className="max-w-md">
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={SearchVisualIcon} />
        </EmptyMedia>
        <EmptyHeader>
          <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
            404 Error
          </span>
          <EmptyTitle className="text-2xl font-bold">Page not found</EmptyTitle>
          <EmptyDescription>
            Sorry, we couldn't find the page you're looking for. It may have
            been moved, deleted, or does not exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild className="gap-2">
              <Link to="/">
                <HugeiconsIcon icon={Home01Icon} className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate(-1)}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
              Go Back
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
