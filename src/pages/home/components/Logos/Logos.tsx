import { cn } from 'cn';

import { defaultLogos } from './Logos.constants';
import type { LogosProps } from './Logos.d';

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
            {visibleLogos.map((logo, index) => {
              const Icon = logo.icon;

              return (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex aspect-3/1 w-28 items-center justify-center opacity-70 transition-opacity hover:opacity-100 sm:w-32"
                >
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-center"
                      title={logo.name}
                    >
                      {Icon ? (
                        <Icon
                          className={cn(
                            logo.className,
                            'h-7 w-auto object-contain',
                          )}
                        />
                      ) : logo.src ? (
                        <img
                          src={logo.src}
                          alt={logo.alt || logo.name}
                          className={cn(
                            logo.className,
                            'h-auto max-h-7 w-auto object-contain dark:invert',
                          )}
                        />
                      ) : null}
                    </a>
                  ) : Icon ? (
                    <Icon
                      className={cn(
                        logo.className,
                        'h-7 w-auto object-contain',
                      )}
                    />
                  ) : logo.src ? (
                    <img
                      src={logo.src}
                      alt={logo.alt || logo.name}
                      className={cn(
                        logo.className,
                        'h-auto max-h-7 w-auto object-contain dark:invert',
                      )}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
