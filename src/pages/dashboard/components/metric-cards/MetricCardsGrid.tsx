import {
  Wallet02Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
  CoinsSwapIcon,
} from '@hugeicons/core-free-icons';

import { Badge } from '@/components/ui/badge/Badge';
import { MetricCard } from './MetricCard';

interface MetricCardsGridProps {
  currencyCode?: string;
  totalBalance: number;
  totalInflow: number;
  totalOutflow: number;
  netCashFlow: number;
  inflowCount: number;
  outflowCount: number;
  timeframeLabel: string;
  isLoading?: boolean;
}

export function MetricCardsGrid({
  currencyCode = 'INR',
  totalBalance,
  totalInflow,
  totalOutflow,
  netCashFlow,
  inflowCount,
  outflowCount,
  timeframeLabel,
  isLoading,
}: MetricCardsGridProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const isNetPositive = netCashFlow >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Balance */}
      <MetricCard
        title="Total Balance"
        value={formatCurrency(totalBalance)}
        subtitle="Live net liquid funds in all accounts"
        icon={Wallet02Icon}
        iconContainerClassName="bg-primary/10 text-primary"
        isLoading={isLoading}
      />

      {/* 2. Total Inflow */}
      <MetricCard
        title={`Total Inflow (${timeframeLabel})`}
        value={formatCurrency(totalInflow)}
        subtitle={`${inflowCount} received transaction${inflowCount === 1 ? '' : 's'}`}
        icon={ArrowUpRight01Icon}
        iconContainerClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        badge={
          <Badge
            variant="outline"
            className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px]"
          >
            Income
          </Badge>
        }
        isLoading={isLoading}
      />

      {/* 3. Total Outflow */}
      <MetricCard
        title={`Total Outflow (${timeframeLabel})`}
        value={formatCurrency(totalOutflow)}
        subtitle={`${outflowCount} expense transaction${outflowCount === 1 ? '' : 's'}`}
        icon={ArrowDownRight01Icon}
        iconContainerClassName="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        badge={
          <Badge
            variant="outline"
            className="border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px]"
          >
            Expense
          </Badge>
        }
        isLoading={isLoading}
      />

      {/* 4. Net Cash Flow */}
      <MetricCard
        title={`Net Cash Flow (${timeframeLabel})`}
        value={formatCurrency(netCashFlow)}
        subtitle={
          isNetPositive
            ? 'Cash surplus generated in period'
            : 'Net deficit (expenses exceeded revenue)'
        }
        icon={CoinsSwapIcon}
        iconContainerClassName={
          isNetPositive
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
        }
        badge={
          <Badge
            variant="outline"
            className={
              isNetPositive
                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px]'
                : 'border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px]'
            }
          >
            {isNetPositive ? 'Surplus' : 'Deficit'}
          </Badge>
        }
        isLoading={isLoading}
      />
    </div>
  );
}
