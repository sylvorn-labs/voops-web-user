import { Add01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';

import { easeTransition } from './Industries.constants';
import type { IndustryCardProps } from './IndustryCard.d';

export function IndustryCard({
  industry,
  index,
  industryLabel = 'Why Voops',
  isActive,
  onActivate,
}: IndustryCardProps) {
  return (
    <a
      href={industry.url}
      className="block overflow-hidden rounded-2xl"
      onClick={event => {
        const canHover = window.matchMedia(
          '(hover: hover) and (pointer: fine)',
        ).matches;
        if (!canHover && !isActive) {
          event.preventDefault();
          onActivate();
        }
      }}
    >
      <motion.div
        key={index}
        className="bg-card group border-border/60 relative min-h-112 overflow-hidden border shadow-xs lg:min-h-128 xl:min-h-112"
        initial="initial"
        animate={isActive ? 'hover' : 'initial'}
        whileHover="hover"
      >
        {/* Default state: Image and heading */}
        <motion.div
          variants={{
            initial: {
              opacity: 1,
              pointerEvents: 'auto',
              clipPath: 'inset(0% 0% 0% 0%)',
            },
            hover: {
              opacity: 0,
              pointerEvents: 'none',
              clipPath: 'inset(0% 0% 100% 0%)',
            },
          }}
          transition={{ duration: 0.4, ease: easeTransition }}
          className="relative z-0 flex h-full min-h-112 flex-col items-center justify-center p-6 lg:min-h-128 xl:min-h-112"
        >
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={industry.image}
              alt={industry.imageAlt}
              className="max-h-56 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-foreground absolute bottom-8 text-center text-xl font-bold tracking-tight">
            {industry.name}
          </h3>
        </motion.div>

        {/* Dark overlay - slides up from bottom */}
        <motion.div
          className="bg-brand-2/95 absolute inset-0 z-10 backdrop-blur-xs"
          variants={{
            initial: { y: '100%' },
            hover: { y: '0%' },
          }}
          transition={{ duration: 0.4, ease: easeTransition }}
          style={{ willChange: 'transform' }}
        />

        {/* Hover state: Description */}
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: easeTransition }}
          className="absolute inset-0 z-20 flex min-h-112 flex-col justify-center p-8 text-white lg:min-h-128 xl:min-h-112"
        >
          <div className="space-y-3">
            <p className="text-accent text-xs font-bold tracking-wider uppercase">
              {industryLabel}
            </p>
            <h4 className="text-xl font-bold">{industry.name}</h4>
            <p className="text-gray-3 text-sm leading-relaxed">
              {industry.description}
            </p>
          </div>
        </motion.div>

        {/* Plus button */}
        <motion.div
          className="absolute top-4 right-4 z-30"
          variants={{
            initial: { opacity: 0.7, rotate: 0 },
            hover: { opacity: 1, rotate: 90 },
          }}
          transition={{ duration: 0.4, ease: easeTransition }}
        >
          <div className="relative rounded-full p-2">
            <div className="bg-muted-foreground/20 absolute inset-0 rounded-full" />
            <motion.div
              className="bg-accent absolute inset-0 rounded-full"
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 0.25 },
              }}
              transition={{ duration: 0.4, ease: easeTransition }}
            />
            <HugeiconsIcon
              icon={Add01Icon}
              className="text-foreground relative z-10 size-4 group-hover:text-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
}
