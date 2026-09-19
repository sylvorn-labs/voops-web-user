import type { ReactNode } from 'react';

export interface SocialLink {
  icon: ReactNode;
  url: string;
  name: string;
}

export interface CommunityProps {
  id?: string;
  logo?: ReactNode;
  heading?: string;
  headingHighlight?: string;
  socialLinks?: SocialLink[];
  className?: string;
}
