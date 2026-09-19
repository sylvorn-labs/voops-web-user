import type { IndustryItem } from './Industries.d';

export interface IndustryCardProps {
  industry: IndustryItem;
  index: number;
  industryLabel?: string;
  isActive: boolean;
  onActivate: () => void;
}
