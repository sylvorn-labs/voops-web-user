import { cn } from 'cn';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TeamProps {
  id?: string;
  heading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const defaultMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Jenil Desai',
    role: 'Founder & Lead Architect',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
  },
  {
    id: 'member-2',
    name: 'Aarav Mehta',
    role: 'Head of Mobile (Flutter)',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
  },
  {
    id: 'member-3',
    name: 'Sophia Patel',
    role: 'Frontend Lead (React)',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
  },
  {
    id: 'member-4',
    name: 'David Kim',
    role: 'Backend & Supabase Architect',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp',
  },
  {
    id: 'member-5',
    name: 'Elena Rostova',
    role: 'UI/UX & Brand Designer',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp',
  },
  {
    id: 'member-6',
    name: 'Lucas Silva',
    role: 'Open Source Community Lead',
    avatar:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp',
  },
];

export function Team({
  id = 'team',
  heading = 'Meet the Minds Behind Voops',
  description = 'The engineering, design, and product team at Sylvorn Labs dedicated to crafting transparent, modern financial tools.',
  members = defaultMembers,
  className,
}: TeamProps) {
  return (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 flex flex-col items-center gap-4 text-center md:mb-20">
          <h2 className="text-foreground max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base text-balance sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {members.map(member => {
            const initials = member.name
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                <Avatar className="border-border ring-primary/10 mb-4 size-20 border ring-4 md:mb-5 lg:size-24">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-base font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <p className="text-foreground text-base font-bold sm:text-lg">
                  {member.name}
                </p>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { Team as Team1 };
