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
    name: 'Parth Kachhela',
    role: 'Idea & Vision',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  },
  {
    id: 'member-2',
    name: 'Jenil Desai',
    role: 'Idea to Development / Lead Architect',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
  },
  {
    id: 'member-3',
    name: 'Jaydeep Gohil',
    role: 'Mobile Application (Flutter)',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
  },
];

export function Team({
  id = 'team',
  heading = 'Meet the Minds Behind Voops',
  description = 'The creators and collaborators behind the architecture, web, and mobile platforms of Voops.',
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

        <div className="mx-auto grid max-w-4xl gap-x-8 gap-y-12 sm:grid-cols-3">
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
