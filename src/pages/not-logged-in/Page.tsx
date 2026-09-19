import { Link } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  LockKeyIcon,
  Login01Icon,
  UserAdd01Icon,
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
import type { NotLoggedInPageProps } from './not-logged-in.d';

export function NotLoggedInPage({ className }: NotLoggedInPageProps) {
  return (
    <div
      className={cn(
        'container mx-auto flex min-h-[calc(100dvh-16rem)] items-center justify-center px-4 py-16',
        className,
      )}
    >
      <Empty className="max-w-md">
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={LockKeyIcon} />
        </EmptyMedia>
        <EmptyHeader>
          <span className="text-primary font-mono text-xs font-semibold tracking-widest uppercase">
            Access Restricted
          </span>
          <EmptyTitle className="text-2xl font-bold">
            Authentication required
          </EmptyTitle>
          <EmptyDescription>
            You must be signed in to access this workspace or feature. Please
            log in to your account or register to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild className="gap-2">
              <Link to="/login">
                <HugeiconsIcon icon={Login01Icon} className="size-4" />
                Sign In
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/register">
                <HugeiconsIcon icon={UserAdd01Icon} className="size-4" />
                Create Account
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
