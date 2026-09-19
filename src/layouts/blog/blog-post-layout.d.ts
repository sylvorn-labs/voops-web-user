import type { ReactNode } from 'react';

export interface BlogPostAuthor {
  name: string;
  website?: string;
  websiteName?: string;
  image: string;
}

export interface BlogPostLayoutProps {
  title: string;
  description?: string;
  author: BlogPostAuthor;
  image?: string;
  pubDate: Date | string;
  backLink?: string;
  backLabel?: string;
  children: ReactNode;
  className?: string;
}
