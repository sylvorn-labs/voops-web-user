export interface IndustryItem {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
}

export interface IndustriesProps {
  id?: string;
  title?: string;
  industryLabel?: string;
  industries?: IndustryItem[];
  className?: string;
}
