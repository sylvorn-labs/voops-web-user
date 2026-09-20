import type { Party, PartyListItem } from '@/types/api/party.d';

export interface PartyDeleteDialogProps {
  party: Party | PartyListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}
