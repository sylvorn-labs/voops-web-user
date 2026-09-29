import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Edit02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import { getAccountByIdOptions } from '@/hooks/api/account.hook';
import type { ViewSheetProps } from '@/types/sheet.d';

import { AccountKindBadge } from '../../list/components/account-kind-badge/AccountKindBadge';
import { AccountStatusBadge } from '../../list/components/account-status-badge/AccountStatusBadge';

export function AccountViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);

  const { data, isLoading, isError, refetch } = useQuery(
    getAccountByIdOptions(id ?? ''),
  );

  const account = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !account) {
    return (
      <SheetErrorState
        message="Failed to load account details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/accounts/${account.id}`);
  };

  const formattedCurrentBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(account.current_balance ?? account.opening_balance);

  const formattedOpeningBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(account.opening_balance);

  const formattedCreatedAt = new Date(account.created_at).toLocaleString(
    'en-IN',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(account.updated_at).toLocaleString(
    'en-IN',
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

      <SheetFieldGroup title="Account Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Account Name" value={account.name} />
          <SheetDetailRow
            label="Type"
            value={<AccountKindBadge kind={account.kind} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Current Balance"
            value={
              <span className="font-mono text-base font-semibold text-emerald-600 dark:text-emerald-400">
                {formattedCurrentBalance}
              </span>
            }
          />
          <SheetDetailRow
            label="Opening Balance"
            value={
              <span className="text-muted-foreground font-mono text-sm">
                {formattedOpeningBalance}
              </span>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Status"
            value={<AccountStatusBadge isArchived={account.is_archived} />}
          />
          <SheetDetailRow label="Account ID" value={account.id} copyable />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Workspace ID"
            value={account.business_id}
            copyable
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="Audit Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Created At" value={formattedCreatedAt} />
          <SheetDetailRow label="Updated At" value={formattedUpdatedAt} />
        </div>
      </SheetFieldGroup>
    </div>
  );
}
