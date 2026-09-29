import { useMemo } from 'react';
import { Link } from 'react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
  Coins01Icon,
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
import type { TransactionListItem } from '@/types/api/transaction.d';
import { cn } from '@/lib/utils';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';

interface RecentTransactionsCardProps {
  transactions: TransactionListItem[];
  currencyCode?: string;
  isLoading?: boolean;
}

export function RecentTransactionsCard({
  transactions,
  currencyCode = 'INR',
  isLoading,
}: RecentTransactionsCardProps) {
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

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const handleRowClick = (tx: TransactionListItem) => {
    openSheet({
      sheetKey: 'transaction',
      mode: 'view',
      id: tx.id,
      title: 'Transaction Details',
      description: 'View details of this transaction record.',
    });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-xs">
            Latest financial activity recorded in your workspace.
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs">
          <Link to="/dashboard/transactions">
            View All
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-border/40 flex items-center justify-between gap-4 border-b py-2.5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-xl" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-muted-foreground flex h-[200px] flex-col items-center justify-center gap-2 text-center">
            <HugeiconsIcon icon={Coins01Icon} className="size-8 opacity-40" />
            <p className="text-sm">No transactions found.</p>
          </div>
        ) : (
          <div className="divide-border/40 divide-y">
            {transactions.slice(0, 6).map(tx => {
              const isCredit = tx.type === 'credit';
              const accountName = tx.account_name || 'Account';
              const partyName = tx.party_name;

              return (
                <div
                  key={tx.id}
                  onClick={() => handleRowClick(tx)}
                  className="group hover:bg-muted/40 -mx-2 flex cursor-pointer items-center justify-between gap-4 rounded-xl px-2 py-3 transition-colors"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
                        isCredit
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                      )}
                    >
                      <HugeiconsIcon
                        icon={
                          isCredit ? ArrowUpRight01Icon : ArrowDownRight01Icon
                        }
                        className="size-4"
                      />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 truncate">
                        <p className="text-foreground truncate text-sm font-medium">
                          {tx.description ||
                            tx.category_name ||
                            (isCredit ? 'Income' : 'Expense')}
                        </p>
                        {tx.category_name && tx.description && (
                          <Badge
                            variant="secondary"
                            className="hidden px-1.5 py-0 text-[10px] font-normal sm:inline-flex"
                          >
                            {tx.category_name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground truncate text-xs">
                        {formatDate(tx.occurred_on)} • {accountName}
                        {partyName ? ` • ${partyName}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={cn(
                        'font-mono text-sm font-semibold tracking-tight',
                        isCredit
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-foreground',
                      )}
                    >
                      {isCredit ? '+' : '-'}
                      {formatCurrency(Number(tx.amount))}
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
