import type { BusinessListItem } from '@/types/api/business.d';

export interface BusinessDeleteDialogProps {
  business: BusinessListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
