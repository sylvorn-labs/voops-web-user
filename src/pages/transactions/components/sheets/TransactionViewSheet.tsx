import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { parseDateOnly } from '@/lib/date';
import {
  Edit02Icon,
  ArrowRight01Icon,
  Archive02Icon,
  ArchiveRestoreIcon,
} from '@hugeicons/core-free-icons';

import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetDetailRow } from '@/components/dashboard/sheet/SheetDetailRow';
import { SheetActionBar } from '@/components/dashboard/sheet/SheetActionBar';
import { useSheetStore } from '@/stores/sheet/sheet.store';
import {
  getTransactionByIdOptions,
  useToggleArchiveTransaction,
} from '@/hooks/api/transaction.hook';
import { TransactionTypeBadge } from '@/pages/transactions/list/components/transaction-type-badge/TransactionTypeBadge';
import { TransactionArchiveBadge } from '@/pages/transactions/list/components/transaction-archive-badge/TransactionArchiveBadge';
import type { ViewSheetProps } from '@/types/sheet.d';

export function TransactionViewSheet({ id }: ViewSheetProps) {
  const navigate = useNavigate();
  const switchMode = useSheetStore(state => state.switchMode);
  const closeSheet = useSheetStore(state => state.close);
  const toggleArchiveMutation = useToggleArchiveTransaction();

  const { data, isLoading, isError, refetch } = useQuery(
    getTransactionByIdOptions(id),
  );

  const transaction = data?.data;

  if (isLoading) {
    return <SheetLoadingSkeleton rows={6} />;
  }

  if (isError || !transaction) {
    return (
      <SheetErrorState
        message="Failed to load transaction details."
        onRetry={() => void refetch()}
      />
    );
  }

  const handleOpenDetails = () => {
    closeSheet();
    navigate(`/dashboard/transactions/${transaction.id}`);
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({
      id: transaction.id,
      is_archived: !transaction.is_archived,
    });
  };

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  const formattedCreatedAt = new Date(transaction.created_at).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const formattedUpdatedAt = new Date(transaction.updated_at).toLocaleString(
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
          icon={transaction.is_archived ? ArchiveRestoreIcon : Archive02Icon}
          label={transaction.is_archived ? 'Restore' : 'Archive'}
          variant="outline"
          onClick={handleToggleArchive}
          loading={toggleArchiveMutation.isPending}
        />
        <SheetActionBar.Button
          icon={ArrowRight01Icon}
          label="Full Details"
          variant="outline"
          onClick={handleOpenDetails}
        />
      </SheetActionBar>

      <SheetFieldGroup title="Transaction Overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Amount"
            value={
              <span className="text-foreground font-semibold">
                {formattedAmount}
              </span>
            }
          />
          <SheetDetailRow
            label="Type"
            value={<TransactionTypeBadge type={transaction.type} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Transaction Date"
            value={format(parseDateOnly(transaction.occurred_on), 'PP')}
          />
          <SheetDetailRow
            label="Status"
            value={
              <TransactionArchiveBadge isArchived={transaction.is_archived} />
            }
          />
        </div>

        <SheetDetailRow
          label="Description / Memo"
          value={transaction.description || 'No description provided.'}
          multiline
        />
      </SheetFieldGroup>

      <SheetFieldGroup title="Accounts & Entities">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label={
              transaction.type === 'debit'
                ? 'Paid From Account'
                : 'Received In Account'
            }
            value={transaction.account_name || 'Unassigned'}
          />
          <SheetDetailRow
            label="Category"
            value={transaction.category_name || 'Uncategorized'}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Project"
            value={transaction.project_name || 'No linked project'}
          />
          <SheetDetailRow
            label={
              transaction.type === 'debit'
                ? 'Paid To Party'
                : 'Received From Party'
            }
            value={transaction.party_name || 'No linked party'}
          />
        </div>
      </SheetFieldGroup>

      <SheetFieldGroup title="System & Audit">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Transaction ID"
            value={transaction.id}
            copyable
          />
          <SheetDetailRow
            label="Workspace ID"
            value={transaction.business_id}
            copyable
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow
            label="Created By"
            value={transaction.created_by_email || transaction.created_by}
            copyable
          />
          <SheetDetailRow label="Created At" value={formattedCreatedAt} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SheetDetailRow label="Last Updated" value={formattedUpdatedAt} />
        </div>
      </SheetFieldGroup>
    </div>
  );
}
