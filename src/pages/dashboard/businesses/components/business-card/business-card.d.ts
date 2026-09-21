import type { BusinessListItem } from '@/types/api/business.d';

export interface BusinessCardProps {
  business: BusinessListItem;
  isActive: boolean;
  onSelect: (business: BusinessListItem) => void;
  onEdit: (business: BusinessListItem) => void;
  onDelete: (business: BusinessListItem) => void;
}
