import {
  Figma,
  Flutter,
  Google,
  React as ReactIcon,
  Supabase,
  TailwindCss,
} from '@thesvg/react';

import type { LogoItem } from './logos.d';

export const defaultLogos: LogoItem[] = [
  {
    name: 'Supabase',
    icon: Supabase,
    className: 'h-7 w-auto',
    href: 'https://supabase.com',
  },
  {
    name: 'React',
    icon: ReactIcon,
    className: 'h-7 w-auto',
    href: 'https://react.dev',
  },
  {
    name: 'Tailwind CSS',
    icon: TailwindCss,
    className: 'h-7 w-auto',
    href: 'https://tailwindcss.com',
  },
  {
    name: 'Flutter',
    icon: Flutter,
    className: 'h-7 w-auto',
    href: 'https://flutter.dev',
  },
  {
    name: 'Google Icon',
    icon: Google,
    className: 'h-7 w-auto',
    href: 'https://fonts.google.com/icons',
  },
  {
    name: 'Figma',
    icon: Figma,
    className: 'h-7 w-auto',
    href: 'https://figma.com',
  },
];
