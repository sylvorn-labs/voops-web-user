import type { IndustryItem } from './industries.d';

export interface IndustryCardProps {
  industry: IndustryItem;
  index: number;
  industryLabel?: string;
  isActive: boolean;
  onActivate: () => void;
}
