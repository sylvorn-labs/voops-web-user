import { Link } from 'react-router';
import { SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from 'cn';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  className?: string;
}

const defaultSections: FooterSection[] = [
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
        name: 'GitHub',
        href: 'https://github.com/Sylvorn-Labs/voops-web-user',
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

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('border-border/40 border-t py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Logo & Tagline */}
          <div className="col-span-2 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
                <HugeiconsIcon icon={SparklesIcon} className="size-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">Voops</span>
            </Link>
            <p className="text-foreground mt-3 text-sm font-semibold">
              Oops! There goes the money.
            </p>
            <p className="text-muted-foreground mt-1 text-xs font-medium">
              Open source multi-business expense tracker engineered by Sylvorn
              Labs.
            </p>
          </div>

          {/* 4 Navigation Columns */}
          {defaultSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 text-sm font-semibold tracking-tight">
                {section.title}
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                {section.links.map((link, linkIdx) => {
                  const isInternal =
                    link.href.startsWith('/') && !link.href.startsWith('/#');

                  return (
                    <li key={linkIdx}>
                      {isInternal ? (
                        <Link
                          to={link.href}
                          className="hover:text-primary font-medium transition-colors"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith('http') ? '_blank' : undefined
                          }
                          rel={
                            link.href.startsWith('http')
                              ? 'noreferrer noopener'
                              : undefined
                          }
                          className="hover:text-primary font-medium transition-colors"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-border text-muted-foreground mt-12 flex flex-col justify-between gap-4 border-t pt-8 text-xs font-medium md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Voops by Sylvorn Labs. All rights
            reserved.
          </p>
          <ul className="flex gap-4">
            <li className="hover:text-primary underline">
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li className="hover:text-primary underline">
              <Link to="/privacy">Privacy & Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
