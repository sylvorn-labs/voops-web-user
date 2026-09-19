import type { BlogPostAuthor } from '@/layouts/blog/blog-post-layout.d';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  label: string;
  author: BlogPostAuthor;
  published: string;
  pubDate: string;
  url: string;
  image: string;
}

export interface BlogProps {
  id?: string;
  tagline?: string;
  heading?: string;
  description?: string;
  posts?: BlogPost[];
  className?: string;
}
