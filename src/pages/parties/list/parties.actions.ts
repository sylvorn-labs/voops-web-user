import type { NavigateFunction } from 'react-router';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';

import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { PartyListItem } from '@/types/api/party.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface PartyRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onToggleArchive: (party: PartyListItem) => void;
  onDeleteParty: (party: PartyListItem) => void;
}

export function getPartyRowActions({
  navigate,
  openSheet,
  onToggleArchive,
  onDeleteParty,
}: PartyRowActionsOptions): RowActionConfig<PartyListItem>[] {
  return [
    // ─── Group 1: View Actions ──────────────────────────────────────────
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: party => {
        openSheet({
          sheetKey: 'party',
          mode: 'view',
          id: party.id,
          title: party.name,
          description: 'Party Information',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: party => {
        navigate(`/dashboard/parties/${party.id}`);
      },
    },

    // ─── Group 2: Edit & Archive Actions ────────────────────────────────
    {
      id: 'edit',
      label: 'Edit party',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: party => {
        openSheet({
          sheetKey: 'party',
          mode: 'edit',
          id: party.id,
          title: 'Edit Party',
          description: 'Update party details and contact info.',
        });
      },
    },
    {
      id: 'toggle-archive',
      label: party => (party.is_archived ? 'Restore party' : 'Archive party'),
      icon: party => (party.is_archived ? ArchiveRestoreIcon : Archive02Icon),
      separatorBefore: false,
      onClick: party => {
        onToggleArchive(party);
      },
    },

    // ─── Group 3: Delete Action ─────────────────────────────────────────
    {
      id: 'delete',
      label: 'Delete party',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: party => {
        onDeleteParty(party);
      },
    },
  ];
}
