import { Link } from 'react-router';
import {
  AndroidIcon,
  AppleIcon,
  ComputerIcon,
  Download01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';

export interface PlatformItem {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  url?: string;
  badgeSrc?: string;
  badgeAlt?: string;
}

export interface DownloadProps {
  id?: string;
  heading?: string;
  description?: string;
  platforms?: {
    desktop?: PlatformItem;
    ios?: PlatformItem;
    android?: PlatformItem;
  };
  className?: string;
}

const defaultPlatforms: Required<NonNullable<DownloadProps['platforms']>> = {
  desktop: {
    title: 'Web Application',
    subtitle: 'Desktop & Web',
    description: 'Full-featured React web app with instant Supabase sync.',
    buttonText: 'Launch Web App',
    url: '/register',
  },
  ios: {
    title: 'Mobile Phone & iPad',
    subtitle: 'Apple iOS',
    description: 'Built with Flutter for high performance on iPhone and iPad.',
    url: '#',
    badgeSrc:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/appstore.png',
    badgeAlt: 'Download on the App Store',
  },
  android: {
    title: 'Phone & Tablet',
    subtitle: 'Google Android',
    description: 'Optimized Flutter application for all Android devices.',
    url: '#',
    badgeSrc:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/googleplay.png',
    badgeAlt: 'Get it on Google Play',
  },
};

export function Download({
  id = 'download',
  heading = 'Available Everywhere You Work',
  description = 'Choose your platform and manage multiple businesses effortlessly. Available across desktop browsers, iOS, and Android.',
  platforms = defaultPlatforms,
  className,
}: DownloadProps) {
  const resolvedPlatforms = {
    ...defaultPlatforms,
    ...platforms,
  };

  return (
    <section id={id} className={cn('bg-muted/40 py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center md:mb-20">
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base text-balance sm:text-lg">
            {description}
          </p>
        </div>

        {/* Download Options Grid */}
        <div className="mx-auto grid max-w-5xl gap-10 sm:gap-12 md:grid-cols-3">
          {/* Desktop / Web */}
          <div className="border-border/60 bg-card text-card-foreground flex flex-col items-center rounded-2xl border p-8 text-center shadow-xs">
            <div className="bg-primary/10 text-primary mb-6 flex size-16 items-center justify-center rounded-2xl">
              <HugeiconsIcon icon={ComputerIcon} className="size-8" />
            </div>
            <h3 className="text-foreground mb-1 text-xl font-bold">
              {resolvedPlatforms.desktop.subtitle}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {resolvedPlatforms.desktop.description}
            </p>
            <div className="mt-auto w-full">
              <Button size="lg" asChild className="w-full">
                <Link
                  to={resolvedPlatforms.desktop.url || '/register'}
                  className="flex items-center justify-center gap-2"
                >
                  <HugeiconsIcon icon={Download01Icon} className="size-4" />
                  <span>{resolvedPlatforms.desktop.buttonText}</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* iOS */}
          <div className="border-border/60 bg-card text-card-foreground flex flex-col items-center rounded-2xl border p-8 text-center shadow-xs">
            <div className="bg-income/10 text-income mb-6 flex size-16 items-center justify-center rounded-2xl">
              <HugeiconsIcon icon={AppleIcon} className="size-8" />
            </div>
            <h3 className="text-foreground mb-1 text-xl font-bold">
              {resolvedPlatforms.ios.subtitle}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {resolvedPlatforms.ios.description}
            </p>
            <div className="mt-auto flex justify-center">
              <a
                href={resolvedPlatforms.ios.url}
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={resolvedPlatforms.ios.badgeSrc}
                  alt={resolvedPlatforms.ios.badgeAlt}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Android */}
          <div className="border-border/60 bg-card text-card-foreground flex flex-col items-center rounded-2xl border p-8 text-center shadow-xs">
            <div className="bg-income/10 text-income mb-6 flex size-16 items-center justify-center rounded-2xl">
              <HugeiconsIcon icon={AndroidIcon} className="size-8" />
            </div>
            <h3 className="text-foreground mb-1 text-xl font-bold">
              {resolvedPlatforms.android.subtitle}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              {resolvedPlatforms.android.description}
            </p>
            <div className="mt-auto flex justify-center">
              <a
                href={resolvedPlatforms.android.url}
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={resolvedPlatforms.android.badgeSrc}
                  alt={resolvedPlatforms.android.badgeAlt}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Download as Download2 };
