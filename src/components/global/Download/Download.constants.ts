import type { DownloadProps } from './download.d';

export const defaultPlatforms: Required<NonNullable<DownloadProps['platforms']>> = {
  desktop: {
    title: 'Web Application',
    subtitle: 'Desktop & Web',
    description: 'Full-featured React web app with instant Supabase sync.',
    buttonText: 'Launch Web App',
    url: '/register',
    statusText: 'Available Now',
  },
  ios: {
    title: 'Mobile Phone & iPad',
    subtitle: 'Apple iOS',
    description:
      'Built with Flutter for high performance on iPhone and iPad. Currently in active development.',
    buttonText: 'View Flutter Repo',
    url: 'https://github.com/sylvorn-labs/voops-mobile-user',
    badgeSrc:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/appstore.png',
    badgeAlt: 'Coming Soon on Apple App Store',
    statusText: 'Coming Soon • In Development',
  },
  android: {
    title: 'Phone & Tablet',
    subtitle: 'Google Android',
    description:
      'Optimized Flutter application for all Android devices. Currently in active development.',
    buttonText: 'View Flutter Repo',
    url: 'https://github.com/sylvorn-labs/voops-mobile-user',
    badgeSrc:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/badges/googleplay.png',
    badgeAlt: 'Coming Soon on Google Play',
    statusText: 'Coming Soon • In Development',
  },
};
