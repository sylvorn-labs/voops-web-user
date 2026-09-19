import type { ReactNode } from 'react';

export interface HelpCategory {
  icon: ReactNode;
  title: string;
  description: string;
  articles: number;
  href?: string;
}

export interface PopularTopic {
  title: string;
  href: string;
}

export interface HelpProps {
  id?: string;
  title?: string;
  description?: string;
  categories?: HelpCategory[];
  popularTopics?: PopularTopic[];
  contactButtonText?: string;
  contactUrl?: string;
  className?: string;
}
