import type { AboutBasicSection, AboutImage } from './About.d';

export const defaultImages: AboutImage[] = [
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-1-16x9.jpg',
    alt: 'Sylvorn Labs engineering team',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-2-16x9.jpg',
    alt: 'Modern engineering workspace',
  },
];

export const defaultSections: AboutBasicSection[] = [
  {
    title: 'The Real Origin Story',
    content:
      'As company owners, we desperately needed a unified expense tracker for daily transactions, multiple money stores (petty cash, wallets, bank accounts), project-level P&L, and transactions with multiple people across client and outsourcing meetings. Without clarity, we had no idea where money was going.',
  },
  {
    title: 'Finding No Match & Building In-House',
    content:
      'In the era of AI, we consulted multiple AIs to discover an existing solution. While tools like Khata Book appeared, none matched our multi-business and multi-project demands. We decided to build our own focused internal tool, initially named simply "Expense Tracker".',
  },
  {
    label: 'Our Core Mission',
    title: 'Solving Timelines, Maintenance, Scale & Economy',
    content:
      'We brainstormed our daily routines to eliminate manual friction and chose Supabase (PostgreSQL, Auth/OAuth, RLS security, Object Storage) alongside React and Flutter to deliver a scalable, open-source platform.',
  },
  {
    label: 'Rebranded to Voops',
    title: 'Oops! There goes the money.',
    content:
      'What began as an internal "Expense Tracker" evolved into Voops — born directly from our own relatable problem statement. We made it open source so every founder and team can gain effortless financial visibility.',
  },
];

export const MAX_COLUMNS = 3;
export const MAX_IMAGES = 2;
export const COLUMN_CHARS = 160;

export const truncate = (content: string) => {
  if (content.length <= COLUMN_CHARS) {
    return content;
  }
  return `${content.slice(0, COLUMN_CHARS).trimEnd()}…`;
};
