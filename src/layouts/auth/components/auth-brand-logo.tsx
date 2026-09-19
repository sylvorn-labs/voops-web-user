import { Link } from 'react-router';
import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function AuthBrandLogo() {
  return (
    <div className="flex justify-center gap-2 md:justify-start">
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
