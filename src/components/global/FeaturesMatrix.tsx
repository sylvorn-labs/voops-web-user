import { cn } from 'cn';

export interface FeatureItem {
  title: string;
  description: string;
  image: string;
  imageDark?: string;
}

export interface FeaturesMatrixProps {
  id?: string;
  title?: string;
  description?: string;
  feature1?: FeatureItem;
  feature2?: FeatureItem;
  feature3?: FeatureItem;
  feature4?: FeatureItem;
  className?: string;
}

const defaultProps: Required<Omit<FeaturesMatrixProps, 'className' | 'id'>> = {
  title: 'Engineered for Complete Financial Clarity',
  description:
    'Voops is designed to give you total visibility across every business venture, team member, project budget, and spending category in real time.',
  feature1: {
    title: 'Multi-Business & Multi-Account Architecture',
    description:
      'Manage multiple independent businesses, cash registers, and bank accounts from a single dashboard with zero friction.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
  feature2: {
    title: 'Team Collaboration & Permissions',
    description:
      'Invite team members to specific businesses with granular role-based access control, transaction approvals, and audit trails.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  feature3: {
    title: 'Project P&L & Budget Tracking',
    description:
      'Assign income and expense streams to project milestones with custom timelines and real-time profitability analytics.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  feature4: {
    title: 'Category & People Analytics',
    description:
      'Gain deep visual intelligence on your top spending categories, recurring vendor payouts, and individual team expense patterns.',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
};

export function FeaturesMatrix({
  id = 'features',
  title = defaultProps.title,
  description = defaultProps.description,
  feature1 = defaultProps.feature1,
  feature2 = defaultProps.feature2,
  feature3 = defaultProps.feature3,
  feature4 = defaultProps.feature4,
  className,
}: FeaturesMatrixProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <h2 className="text-foreground max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base text-balance sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex justify-center">
          <div className="border-border bg-card text-card-foreground relative flex w-full flex-col overflow-hidden rounded-2xl border shadow-xs">
            {/* Top Row: 3/5 Left, 2/5 Right on Large Screens */}
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-border flex flex-col justify-between border-b p-8 sm:p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    {feature1.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {feature1.description}
                  </p>
                </div>
                <div className="border-border/60 bg-muted/40 mt-8 overflow-hidden rounded-xl border p-2">
                  <img
                    src={feature1.image}
                    alt={feature1.title}
                    className="aspect-[1.5] h-full w-full rounded-lg object-cover lg:aspect-[2.4]"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-2/5">
                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    {feature2.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {feature2.description}
                  </p>
                </div>
                <div className="border-border/60 bg-muted/40 mt-8 overflow-hidden rounded-xl border p-2">
                  <img
                    src={feature2.image}
                    alt={feature2.title}
                    className="aspect-[1.45] h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: 2/5 Left, 3/5 Right on Large Screens */}
            <div className="border-border relative flex flex-col border-t lg:flex-row">
              <div className="border-border flex flex-col justify-between border-b p-8 sm:p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    {feature3.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {feature3.description}
                  </p>
                </div>
                <div className="border-border/60 bg-muted/40 mt-8 overflow-hidden rounded-xl border p-2">
                  <img
                    src={feature3.image}
                    alt={feature3.title}
                    className="aspect-[1.45] h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-3/5">
                <div className="space-y-2">
                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    {feature4.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                    {feature4.description}
                  </p>
                </div>
                <div className="border-border/60 bg-muted/40 mt-8 overflow-hidden rounded-xl border p-2">
                  <img
                    src={feature4.image}
                    alt={feature4.title}
                    className="aspect-[1.5] h-full w-full rounded-lg object-cover lg:aspect-[2.4]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeaturesMatrix as Feature166 };
