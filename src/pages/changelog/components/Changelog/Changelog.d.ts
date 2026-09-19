export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
}

export interface ChangelogProps {
  id?: string;
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
  className?: string;
}
