import type { NavigateFunction } from 'react-router';
import {
  ArrowRight01Icon,
  Delete02Icon,
  Edit02Icon,
  ViewIcon,
} from '@hugeicons/core-free-icons';

import type { RowActionConfig } from '@/components/dashboard/data-table/types';
import type { MemberListItem } from '@/types/api/member.d';
import type { OpenSheetConfig } from '@/types/sheet.d';

export interface MemberRowActionsOptions {
  navigate: NavigateFunction;
  openSheet: (options: OpenSheetConfig) => void;
  onDeleteMember: (member: MemberListItem) => void;
}

export function getMemberRowActions({
  navigate,
  openSheet,
  onDeleteMember,
}: MemberRowActionsOptions): RowActionConfig<MemberListItem>[] {
  return [
    // ─── Group 1: View Actions ──────────────────────────────────────────
    {
      id: 'quick-view',
      label: 'Quick View',
      icon: ViewIcon,
      separatorBefore: false,
      onClick: member => {
        openSheet({
          sheetKey: 'member',
          mode: 'view',
          id: member.id,
          title: `Member: ${member.email}`,
          description: 'Workspace Member Details',
        });
      },
    },
    {
      id: 'view-details',
      label: 'View Details',
      icon: ArrowRight01Icon,
      separatorBefore: false,
      onClick: member => {
        navigate(`/dashboard/members/${member.id}`);
      },
    },

    // ─── Group 2: Edit Actions ──────────────────────────────────────────
    {
      id: 'edit',
      label: 'Edit Role',
      icon: Edit02Icon,
      separatorBefore: true,
      onClick: member => {
        openSheet({
          sheetKey: 'member',
          mode: 'edit',
          id: member.id,
          title: 'Edit Member Role',
          description: 'Update member permissions for this workspace.',
        });
      },
    },

    // ─── Group 3: Delete Action ─────────────────────────────────────────
    {
      id: 'delete',
      label: 'Remove Member',
      icon: Delete02Icon,
      variant: 'destructive',
      separatorBefore: true,
      onClick: member => {
        onDeleteMember(member);
      },
    },
  ];
}
