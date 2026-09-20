import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowLeft01Icon,
  Delete02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DetailsLayout } from '@/layouts/dashboard-detail/DetailsLayout';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import { Loading } from '@/components/global/Loading';
import { Error } from '@/components/global/Error';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import {
  getTransactionByIdOptions,
  useToggleArchiveTransaction,
} from '@/hooks/api/transaction.hook';

import { TransactionDeleteDialog } from '@/pages/transactions/components/transaction-delete-dialog/TransactionDeleteDialog';
import { TransactionBasicTab } from './components/transaction-basic-tab/TransactionBasicTab';

export function TransactionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveTransaction();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getTransactionByIdOptions(id || ''),
  );

  const transaction = data?.data;

  useEffect(() => {
    if (transaction) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Transactions', href: '/dashboard/transactions' },
        {
          label:
            transaction.description ||
            `Transaction ${transaction.id.slice(0, 8)}`,
        },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Transactions', href: '/dashboard/transactions' },
      ]);
    }
  }, [transaction, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading transaction details..." />;
  }

  if (isError || !transaction) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Transaction not found"
          description="The requested transaction does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Transactions',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/transactions'),
          }}
          secondaryAction={{
            label: 'Try Again',
            icon: RefreshIcon,
            onClick: () => void refetch(),
          }}
        />
      </div>
    );
  }

  const handleEditInSheet = () => {
    openSheet({
      sheetKey: 'transaction',
      mode: 'edit',
      id: transaction.id,
      title: 'Edit Transaction',
      description: 'Update transaction details and classifications.',
    });
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

  const title = transaction.description
    ? transaction.description
    : `${transaction.type === 'credit' ? 'Income' : 'Expense'} - ${formattedAmount}`;

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <TransactionBasicTab transaction={transaction} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title,
          description: `Occurred on ${new Date(transaction.occurred_on).toLocaleDateString()} · ${transaction.type === 'credit' ? 'Income' : 'Expense'}`,
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/transactions')}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-1 size-4" />
                Back
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="size-8 p-0">
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      className="size-4"
                    />
                    <span className="sr-only">Open actions menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-fit min-w-[180px]"
                >
                  <DropdownMenuItem
                    onClick={handleEditInSheet}
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                    Edit transaction
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleToggleArchive}
                    className="w-full"
                  >
                    <HugeiconsIcon
                      icon={
                        transaction.is_archived
                          ? ArchiveRestoreIcon
                          : Archive02Icon
                      }
                      className="size-4"
                    />
                    {transaction.is_archived
                      ? 'Restore transaction'
                      : 'Archive transaction'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Delete transaction
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <TransactionDeleteDialog
        transaction={transaction}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/transactions')}
      />
    </>
  );
}
