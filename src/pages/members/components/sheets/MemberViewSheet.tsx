import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Edit02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import { getMemberByIdOptions } from '@/hooks/api/member.hook';
import { MemberRoleBadge } from '@/pages/members/list/components/member-role-badge/MemberRoleBadge';
import type { ViewSheetProps } from '@/types/sheet.d';

export function MemberViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);

  const { data, isLoading, isError, refetch } = useQuery(
    getMemberByIdOptions(id),
  );

  const member = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !member) {
    return (
      <SheetErrorState
        message="Failed to load member details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/members/${member.id}`);
  };

  const formattedJoinedAt = new Date(member.joined_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedCreatedAt = new Date(member.created_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(member.updated_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <SheetActionBar>
        <SheetActionBar.Button
          icon={Edit02Icon}
          label="Edit"
          variant="outline"
          onClick={() => switchMode('edit')}
        />
        <SheetActionBar.Button
          icon={ArrowRight01Icon}
          label="Full Details"
          variant="outline"
          onClick={handleOpenDetails}
        />
      </SheetActionBar>

      <SheetFieldGroup title="Member Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Email Address" value={member.email} copyable />
          <SheetDetailRow
            label="Role & Access"
            value={<MemberRoleBadge role={member.role} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Member ID" value={member.id} copyable />
          <SheetDetailRow
            label="Workspace ID"
            value={member.business_id}
            copyable
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Membership Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Invited By"
            value={member.invited_by_email || 'Workspace Owner'}
            copyable={Boolean(member.invited_by_email)}
          />
          <SheetDetailRow label="Joined Date" value={formattedJoinedAt} />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Audit Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Created At" value={formattedCreatedAt} />
          <SheetDetailRow label="Last Updated" value={formattedUpdatedAt} />
        </div>
      </SheetFieldGroup>
    </div>
  );
}
