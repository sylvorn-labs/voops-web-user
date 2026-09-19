import type { BusinessListItem } from '@/types/api/business.d';

export interface BusinessGridProps {
  businesses: BusinessListItem[];
  activeBusinessId: string | null;
  onSelect: (business: BusinessListItem) => void;
  onEdit: (business: BusinessListItem) => void;
  onDelete: (business: BusinessListItem) => void;
}
