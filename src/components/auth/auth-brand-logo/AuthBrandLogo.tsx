import { Link } from 'react-router';
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
        <img
          src="/favicon.svg"
          alt="Voops"
          className="size-7 object-contain dark:brightness-0 dark:invert"
        />
        <span className="text-lg font-extrabold">Voops</span>
      </Link>
    </div>
  );
}
