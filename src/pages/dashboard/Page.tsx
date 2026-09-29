import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { subDays, startOfMonth, parseISO, isAfter } from 'date-fns';

import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { getBusinessByIdOptions } from '@/hooks/api/business.hook';
import { listTransactionsOptions } from '@/hooks/api/transaction.hook';
import { listAccountsOptions } from '@/hooks/api/account.hook';
import { listCategoriesOptions } from '@/hooks/api/category.hook';

import {
  DashboardHeader,
  type DashboardTimeframe,
} from './components/dashboard-header/DashboardHeader';
import { MetricCardsGrid } from './components/metric-cards/MetricCardsGrid';
import {
  CashFlowChart,
  type CashFlowDataPoint,
} from './components/charts/CashFlowChart';
import {
  CategoryExpenseChart,
  type CategoryExpenseDataPoint,
} from './components/charts/CategoryExpenseChart';
import { RecentTransactionsCard } from './components/recent-activity/RecentTransactionsCard';
import { AccountsSnapshotCard } from './components/recent-activity/AccountsSnapshotCard';
import { DashboardQuickActions } from './components/quick-actions/DashboardQuickActions';
import { DashboardEmptyState } from './components/empty-state/DashboardEmptyState';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';

const TIMEFRAME_LABELS: Record<DashboardTimeframe, string> = {
  '30d': 'Last 30 Days',
  month: 'This Month',
  '90d': 'Last 90 Days',
  all: 'All Time',
};

export function DashboardPage() {
  const [timeframe, setTimeframe] = useState<DashboardTimeframe>('30d');
  const activeBusinessId = useActiveBusinessId();
  const setBreadcrumbs = useSetBreadcrumbs();

  // 1. Fetch Business Details
  const { data: businessData, isLoading: isBusinessLoading } = useQuery({
    ...getBusinessByIdOptions(activeBusinessId ?? ''),
    enabled: Boolean(activeBusinessId),
  });

  // 2. Fetch Transactions
  const { data: txData, isLoading: isTxLoading } = useQuery({
    ...listTransactionsOptions({
      business_id: activeBusinessId ?? '',
      limit: 100,
      is_archived: false,
      sortBy: 'occurred_on',
      sortOrder: 'desc',
    }),
    enabled: Boolean(activeBusinessId),
  });

  // 3. Fetch Accounts
  const { data: accountsData, isLoading: isAccountsLoading } = useQuery({
    ...listAccountsOptions({
      business_id: activeBusinessId ?? '',
      limit: 50,
      is_archived: false,
    }),
    enabled: Boolean(activeBusinessId),
  });

  // 4. Fetch Categories
  const { data: categoriesData } = useQuery({
    ...listCategoriesOptions({
      business_id: activeBusinessId ?? '',
      limit: 50,
    }),
    enabled: Boolean(activeBusinessId),
  });

  const business = businessData?.data;
  const currencyCode = business?.currency_code || 'INR';
  const allTransactions = useMemo(() => txData?.data?.items ?? [], [txData]);
  const allAccounts = useMemo(
    () => accountsData?.data?.items ?? [],
    [accountsData],
  );
  const allCategories = useMemo(
    () => categoriesData?.data?.items ?? [],
    [categoriesData],
  );

  // Timeframe Cutoff Date
  const cutoffDate = useMemo(() => {
    const now = new Date();
    switch (timeframe) {
      case '30d':
        return subDays(now, 30);
      case 'month':
        return startOfMonth(now);
      case '90d':
        return subDays(now, 90);
      case 'all':
      default:
        return null;
    }
  }, [timeframe]);

  // Filtered transactions for the selected timeframe
  const filteredTransactions = useMemo(() => {
    if (!cutoffDate) return allTransactions;
    return allTransactions.filter(tx => {
      try {
        const txDate = parseISO(tx.occurred_on);
        return (
          isAfter(txDate, cutoffDate) ||
          txDate.getTime() === cutoffDate.getTime()
        );
      } catch {
        return true;
      }
    });
  }, [allTransactions, cutoffDate]);

  // Metrics Calculation
  const { totalInflow, totalOutflow, netCashFlow, inflowCount, outflowCount } =
    useMemo(() => {
      let inflow = 0;
      let outflow = 0;
      let inCount = 0;
      let outCount = 0;

      filteredTransactions.forEach(tx => {
        const amt = Number(tx.amount ?? 0);
        if (tx.type === 'credit') {
          inflow += amt;
          inCount += 1;
        } else {
          outflow += amt;
          outCount += 1;
        }
      });

      return {
        totalInflow: inflow,
        totalOutflow: outflow,
        netCashFlow: inflow - outflow,
        inflowCount: inCount,
        outflowCount: outCount,
      };
    }, [filteredTransactions]);

  const totalBalance = useMemo(() => {
    return Number(business?.current_balance ?? 0);
  }, [business?.current_balance]);

  // Cash Flow Trend Chart Data (Chronological Grouping)
  const cashFlowChartData = useMemo<CashFlowDataPoint[]>(() => {
    const dateMap = new Map<string, { inflow: number; outflow: number }>();

    filteredTransactions.forEach(tx => {
      const dateKey = tx.occurred_on;
      const current = dateMap.get(dateKey) || { inflow: 0, outflow: 0 };
      const amt = Number(tx.amount ?? 0);

      if (tx.type === 'credit') {
        current.inflow += amt;
      } else {
        current.outflow += amt;
      }
      dateMap.set(dateKey, current);
    });

    return Array.from(dateMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dateKey, stats]) => {
        let formattedDate = dateKey;
        try {
          const d = parseISO(dateKey);
          formattedDate = d.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
          });
        } catch {
          // ignore
        }

        return {
          date: dateKey,
          formattedDate,
          inflow: stats.inflow,
          outflow: stats.outflow,
        };
      });
  }, [filteredTransactions]);

  // Category Expenses Breakdown Chart Data
  const categoryExpenseChartData = useMemo<CategoryExpenseDataPoint[]>(() => {
    const catMap = new Map<string, number>();

    filteredTransactions
      .filter(tx => tx.type === 'debit')
      .forEach(tx => {
        const catId = tx.category_id || 'uncategorized';
        const current = catMap.get(catId) || 0;
        catMap.set(catId, current + Number(tx.amount ?? 0));
      });

    const categoryObjMap = new Map(allCategories.map(c => [c.id, c]));

    return Array.from(catMap.entries())
      .map(([catId, amount]) => {
        const cat = categoryObjMap.get(catId);
        return {
          categoryId: catId,
          categoryName:
            cat?.name ||
            (catId === 'uncategorized' ? 'General / Uncategorized' : 'Unknown'),
          amount,
          color: cat?.color || null,
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions, allCategories]);

  useEffect(() => {
    setBreadcrumbs([{ label: 'Dashboard', href: '/dashboard', isPage: true }]);
  }, [setBreadcrumbs]);

  // Loading indicator
  const isLoading = isBusinessLoading || isTxLoading || isAccountsLoading;

  if (!activeBusinessId) {
    return <DashboardEmptyState type="no-business" />;
  }

  if (!isLoading && allTransactions.length === 0 && allAccounts.length === 0) {
    return (
      <div className="space-y-6 p-6 lg:p-10">
        <DashboardHeader
          businessName={business?.name}
          currencyCode={currencyCode}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
        />
        <DashboardEmptyState type="no-data" businessName={business?.name} />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Actions */}
      <DashboardHeader
        businessName={business?.name}
        currencyCode={currencyCode}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* 2. Key Metric Cards */}
      <MetricCardsGrid
        currencyCode={currencyCode}
        totalBalance={totalBalance}
        totalInflow={totalInflow}
        totalOutflow={totalOutflow}
        netCashFlow={netCashFlow}
        inflowCount={inflowCount}
        outflowCount={outflowCount}
        timeframeLabel={TIMEFRAME_LABELS[timeframe]}
        isLoading={isLoading}
      />

      {/* 3. Visual Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CashFlowChart
            data={cashFlowChartData}
            currencyCode={currencyCode}
            timeframeLabel={TIMEFRAME_LABELS[timeframe]}
            isLoading={isLoading}
          />
        </div>
        <div>
          <CategoryExpenseChart
            data={categoryExpenseChartData}
            currencyCode={currencyCode}
            timeframeLabel={TIMEFRAME_LABELS[timeframe]}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* 4. Operational Widgets: Recent Activity & Accounts Snapshot */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTransactionsCard
          transactions={allTransactions}
          currencyCode={currencyCode}
          isLoading={isLoading}
        />
        <AccountsSnapshotCard
          accounts={allAccounts}
          currencyCode={currencyCode}
          isLoading={isLoading}
        />
      </div>

      {/* 5. Quick Actions Footer Card */}
      <DashboardQuickActions />
    </div>
  );
}
