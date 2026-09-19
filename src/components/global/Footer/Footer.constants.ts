import type { FooterSection } from './Footer.d';

export const defaultSections: FooterSection[] = [
  {
    title: 'Legal',
    links: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy & Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Changelog', href: '/changelog' },
      { name: 'Road Map', href: '/roadmap' },
      {
        name: 'GitHub (Web)',
        href: 'https://github.com/Sylvorn-Labs/voops-web-user',
      },
      {
        name: 'GitHub (Mobile)',
        href: 'https://github.com/sylvorn-labs/voops-mobile-user',
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      { name: 'Dashboard', href: '/' },
      { name: 'Login', href: '/login' },
      { name: 'Register', href: '/register' },
    ],
  },
];
