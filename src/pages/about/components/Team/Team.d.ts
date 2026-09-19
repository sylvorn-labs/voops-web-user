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
