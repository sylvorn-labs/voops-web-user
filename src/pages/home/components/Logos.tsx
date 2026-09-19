import { cn } from 'cn';

export interface LogoItem {
  src: string;
  alt: string;
  srcDark?: string;
  className?: string;
  href?: string;
}

export interface LogosProps {
  logos?: LogoItem[];
  className?: string;
  maxLogos?: number;
}

const defaultLogos: LogoItem[] = [
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-1.svg',
    alt: 'Partner logo 1',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-2.svg',
    alt: 'Partner logo 2',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-3.svg',
    alt: 'Partner logo 3',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-4.svg',
    alt: 'Partner logo 4',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-5.svg',
    alt: 'Partner logo 5',
    className: 'h-5 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-6.svg',
    alt: 'Partner logo 6',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-7.svg',
    alt: 'Partner logo 7',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-8.svg',
    alt: 'Partner logo 8',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-9.svg',
    alt: 'Partner logo 9',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-10.svg',
    alt: 'Partner logo 10',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-11.svg',
    alt: 'Partner logo 11',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/logos/fictional-company-logo-12.svg',
    alt: 'Partner logo 12',
    className: 'h-7 w-auto',
    href: 'https://www.shadcnblocks.com',
  },
];

export function Logos({
  logos = defaultLogos,
  className,
  maxLogos = 6,
}: LogosProps) {
  const visibleLogos = logos.slice(0, maxLogos);

  return (
    <section className={cn('py-12 md:py-16 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
            {visibleLogos.map((logo, index) => (
              <div
                key={`${logo.src}-${index}`}
                className="flex aspect-3/1 w-28 items-center justify-center opacity-70 transition-opacity hover:opacity-100 sm:w-32"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={cn(
                    logo.className,
                    'h-auto max-h-7 w-auto object-contain dark:invert',
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Logos as Logos18 };
