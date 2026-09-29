import { useMemo } from 'react';
import { Link } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BankIcon,
  CreditCardIcon,
  Money03Icon,
  Wallet02Icon,
  Building06Icon,
  ArrowRight01Icon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Button } from '@/components/ui/button/Button';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import type { AccountListItem, AccountKind } from '@/types/api/account.d';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';

interface AccountsSnapshotCardProps {
  accounts: AccountListItem[];
  currencyCode?: string;
  isLoading?: boolean;
}

function getAccountIcon(kind: AccountKind) {
  switch (kind) {
    case 'bank':
      return BankIcon;
    case 'card':
      return CreditCardIcon;
    case 'cash':
      return Money03Icon;
    case 'wallet':
      return Wallet02Icon;
    default:
      return Building06Icon;
  }
}

export function AccountsSnapshotCard({
  accounts,
  currencyCode = 'INR',
  isLoading,
}: AccountsSnapshotCardProps) {
  const openSheet = useSheetOpen();

  const formatCurrency = useMemo(
    () => (val: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: 2,
      }).format(val);
    },
    [currencyCode],
  );

  const handleRowClick = (acc: AccountListItem) => {
    openSheet({
      sheetKey: 'account',
      mode: 'view',
      id: acc.id,
      title: 'Account Details',
      description: 'View details of this financial account.',
    });
  };

  const handleAddAccount = () => {
    openSheet({
      sheetKey: 'account',
      mode: 'add',
      title: 'Add Account',
      description: 'Add a new bank, wallet, or cash account to track funds.',
    });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold">
            Accounts Snapshot
          </CardTitle>
          <CardDescription className="text-xs">
            Overview of liquidity and balances across active accounts.
          </CardDescription>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddAccount}
            className="h-8 gap-1 text-xs"
          >
            <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
            Add
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-8 gap-1 text-xs"
          >
            <Link to="/dashboard/accounts">
              View All
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border-border/40 flex items-center justify-between gap-4 border-b py-2.5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-muted-foreground flex h-[200px] flex-col items-center justify-center gap-3 text-center">
            <HugeiconsIcon icon={Wallet02Icon} className="size-8 opacity-40" />
            <p className="text-sm">No payment accounts created yet.</p>
            <Button size="sm" variant="outline" onClick={handleAddAccount}>
              <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-3.5" />
              Create First Account
            </Button>
          </div>
        ) : (
          <div className="divide-border/40 divide-y">
            {accounts.slice(0, 5).map(acc => {
              const Icon = getAccountIcon(acc.kind);
              const balance = Number(
                acc.current_balance ?? acc.opening_balance ?? 0,
              );

              return (
                <div
                  key={acc.id}
                  onClick={() => handleRowClick(acc)}
                  className="group hover:bg-muted/40 -mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-xl px-2 py-3 transition-colors"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
                      <HugeiconsIcon icon={Icon} className="size-4" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-foreground truncate text-sm font-medium">
                        {acc.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className="px-1.5 py-0 text-[10px] font-normal capitalize"
                      >
                        {acc.kind}
                      </Badge>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-foreground font-mono text-sm font-semibold tracking-tight">
                      {formatCurrency(balance)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
