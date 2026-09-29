import { HugeiconsIcon } from '@hugeicons/react';
import {
  Building02Icon,
  PlusSignIcon,
  Wallet02Icon,
  CoinsSwapIcon,
} from '@hugeicons/core-free-icons';
import { Link } from 'react-router';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty/Empty';
import { Button } from '@/components/ui/button/Button';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';

interface DashboardEmptyStateProps {
  type: 'no-business' | 'no-data';
  businessName?: string;
}

export function DashboardEmptyState({
  type,
  businessName,
}: DashboardEmptyStateProps) {
  const openSheet = useSheetOpen();

  const handleAddBusiness = () => {
    openSheet({
      sheetKey: 'business',
      mode: 'add',
      title: 'Create Business',
      description: 'Create a new business workspace to start tracking finances.',
    });
  };

  const handleAddAccount = () => {
    openSheet({
      sheetKey: 'account',
      mode: 'add',
      title: 'Add Account',
      description: 'Add a bank, cash, or wallet account to record transactions.',
    });
  };

  const handleAddTransaction = () => {
    openSheet({
      sheetKey: 'transaction',
      mode: 'add',
      title: 'Record Transaction',
      description: 'Record an income or expense transaction.',
    });
  };

  if (type === 'no-business') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Empty className="max-w-md text-center">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={Building02Icon} className="size-8" />
            </EmptyMedia>
            <EmptyTitle>No Active Business Selected</EmptyTitle>
            <EmptyDescription>
              Select an existing business workspace or create a new one to start
              viewing your financial overview, cashflow charts, and metrics.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={handleAddBusiness}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1.5 size-4" />
              Create Business
            </Button>
            <Button variant="outline" asChild>
              <Link to="/dashboard/businesses">View All Businesses</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Empty className="max-w-md text-center">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={Wallet02Icon} className="size-8" />
          </EmptyMedia>
          <EmptyTitle>
            Welcome to {businessName || 'Your Workspace'}!
          </EmptyTitle>
          <EmptyDescription>
            You are ready to start tracking your finances. Get started by setting
            up your first payment account or recording a transaction.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleAddAccount}>
            <HugeiconsIcon icon={Wallet02Icon} className="mr-1.5 size-4" />
            Add First Account
          </Button>
          <Button variant="outline" onClick={handleAddTransaction}>
            <HugeiconsIcon icon={CoinsSwapIcon} className="mr-1.5 size-4" />
            Add Transaction
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
