import { Link } from 'react-router';
import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import type { AuthBrandLogoProps } from './auth-brand-logo.d';

export function AuthBrandLogo({ className }: AuthBrandLogoProps) {
  return (
    <div
      className={cn('flex justify-center gap-2 md:justify-start', className)}
    >
      <Link
        to="/"
        className="text-foreground flex items-center gap-2.5 font-bold tracking-tight transition-opacity hover:opacity-90"
      >
        <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
          <HugeiconsIcon icon={SparklesIcon} className="size-4" />
        </div>
        <span className="text-lg font-extrabold">Voops</span>
      </Link>
    </div>
  );
}
