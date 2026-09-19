export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
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
