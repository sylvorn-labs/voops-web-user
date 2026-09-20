import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Edit02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import { getPartyByIdOptions } from '@/hooks/api/party.hook';
import { PartyKindBadge } from '@/pages/parties/list/components/party-kind-badge/PartyKindBadge';
import { PartyArchiveBadge } from '@/pages/parties/list/components/party-archive-badge/PartyArchiveBadge';
import type { ViewSheetProps } from '@/types/sheet.d';

export function PartyViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);

  const { data, isLoading, isError, refetch } = useQuery(
    getPartyByIdOptions(id),
  );

  const party = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !party) {
    return (
      <SheetErrorState
        message="Failed to load party details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/parties/${party.id}`);
  };

  const formattedCreatedAt = new Date(party.created_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(party.updated_at).toLocaleString(
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

      <SheetFieldGroup title="Party Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Party Name" value={party.name} />
          <SheetDetailRow
            label="Type"
            value={<PartyKindBadge kind={party.kind} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Status"
            value={<PartyArchiveBadge isArchived={party.is_archived} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Party ID" value={party.id} copyable />
          <SheetDetailRow
            label="Workspace ID"
            value={party.business_id}
            copyable
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Contact Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Email Address"
            value={party.email || 'Not provided'}
            copyable={Boolean(party.email)}
          />
          <SheetDetailRow
            label="Phone Number"
            value={party.phone || 'Not provided'}
            copyable={Boolean(party.phone)}
          />
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
