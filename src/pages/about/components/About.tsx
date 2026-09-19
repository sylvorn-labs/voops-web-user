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
    alt: 'Sylvorn Labs engineering collective',
  },
  {
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/about/photo-2-16x9.jpg',
    alt: 'Modern workspace',
  },
];

const defaultSections: AboutBasicSection[] = [
  {
    title: 'Our Vision',
    content:
      'Traditional accounting software forces operators into expensive single-entity silos. Voops unifies your holding companies, agencies, and side projects under a single intuitive pane of glass.',
  },
  {
    title: 'The Sylvorn Labs Collective',
    content:
      'We are an open-source engineering collective dedicated to building transparent, developer-first tools. We build the software we rely on every day to run our own projects.',
  },
  {
    label: 'Our Core Mission',
    title: 'Democratizing multi-business financial intelligence.',
    content:
      'To empower 100,000+ multi-venture founders and operators with open-source financial tools that guarantee 100% data sovereignty and zero vendor lock-in.',
  },
  {
    label: 'What Drives Us',
    title: 'Clarity, Speed, and True Ownership.',
    content:
      'We start from the operator experience and the simplest path forward. Clean code, sub-second latency, and intuitive design lead to smarter capital decisions.',
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
  heading = 'Building the financial OS for multi-venture operators.',
  description = 'Sylvorn Labs was founded on a simple principle: modern founders running multiple companies shouldn’t be penalized with separate subscriptions or messy disconnected spreadsheets.',
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
