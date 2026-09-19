import { cn } from 'cn';

export interface AboutBasicSection {
  title: string;
  content: string;
  label?: string;
}

export interface AboutImage {
  src: string;
  alt: string;
  srcDark?: string;
}

export interface AboutProps {
  id?: string;
  heading?: string;
  description?: string;
  images?: AboutImage[];
  sections?: AboutBasicSection[];
  className?: string;
}

const defaultImages: AboutImage[] = [
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-1-16x9.jpg',
    alt: 'Sylvorn Labs engineering team',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-2-16x9.jpg',
    alt: 'Modern engineering workspace',
  },
];

const defaultSections: AboutBasicSection[] = [
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

const MAX_COLUMNS = 3;
const MAX_IMAGES = 2;
const COLUMN_CHARS = 160;

const truncate = (content: string) => {
  if (content.length <= COLUMN_CHARS) {
    return content;
  }
  return `${content.slice(0, COLUMN_CHARS).trimEnd()}…`;
};

export function About({
  id = 'about',
  heading = 'Born from our own operational chaos to give founders complete financial clarity.',
  description = 'Sylvorn Labs built Voops because existing tools couldn’t handle multi-store finances, cross-project transactions, and contractor expenses without painful workarounds.',
  images = defaultImages,
  sections = defaultSections,
  className,
}: AboutProps) {
  const gallery = images.slice(0, MAX_IMAGES);
  const columns = sections.slice(0, MAX_COLUMNS);
  const mission = sections[2];
  const valuesTitle = sections[2]?.title;
  const valuesBody = sections[3]?.content;

  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <h2 className="text-foreground max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
              {heading}
            </h2>
            {description && (
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg lg:text-xl">
                {description}
              </p>
            )}
          </div>

          {/* 2-Column Hero Images / Mission Overlay */}
          <div className="grid gap-6 md:grid-cols-2">
            {gallery[0] && (
              <img
                src={gallery[0].src}
                alt={gallery[0].alt}
                className="border-border/60 size-full max-h-96 rounded-2xl border object-cover shadow-xs"
              />
            )}
            <div
              className="border-border/60 bg-muted relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border bg-cover bg-center p-8 shadow-xs sm:p-10"
              style={
                gallery[1]
                  ? { backgroundImage: `url(${gallery[1].src})` }
                  : undefined
              }
            >
              <div className="bg-background/85 absolute inset-0 backdrop-blur-xs" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                {mission?.label && (
                  <p className="text-primary text-xs font-bold tracking-wider uppercase">
                    {mission.label}
                  </p>
                )}
                {mission?.content && (
                  <p className="text-foreground text-base leading-relaxed font-semibold sm:text-lg">
                    {mission.content}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="flex flex-col gap-10">
            <div className="flex max-w-2xl flex-col gap-3">
              {valuesTitle && (
                <h3 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {valuesTitle}
                </h3>
              )}
              {valuesBody && (
                <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                  {valuesBody}
                </p>
              )}
            </div>

            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {columns.map(section => (
                <div
                  key={section.title}
                  className="border-border/60 flex flex-col gap-3 border-t pt-6"
                >
                  <h4 className="text-foreground text-base font-bold sm:text-lg">
                    {section.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {truncate(section.content)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { About as About29 };
