import { useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { HugeiconsIcon } from '@hugeicons/react';
import { PieChart01Icon } from '@hugeicons/core-free-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart/Chart';
import type { ChartConfig } from '@/components/ui/chart/chart.d';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

export interface CategoryExpenseDataPoint {
  categoryId: string;
  categoryName: string;
  amount: number;
  color?: string | null;
}

interface CategoryExpenseChartProps {
  data: CategoryExpenseDataPoint[];
  currencyCode?: string;
  timeframeLabel: string;
  isLoading?: boolean;
}

const DEFAULT_COLORS = [
  'oklch(0.646 0.222 41.116)',
  'oklch(0.6 0.118 184.704)',
  'oklch(0.707 0.165 254.624)',
  'oklch(0.627 0.265 303.9)',
  'oklch(0.792 0.209 151.711)',
  'oklch(0.553 0.195 261.644)',
  'oklch(0.768 0.233 130.85)',
];

export function CategoryExpenseChart({
  data,
  currencyCode = 'INR',
  timeframeLabel,
  isLoading,
}: CategoryExpenseChartProps) {
  const formatCurrency = useMemo(
    () => (val: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: 0,
      }).format(val);
    },
    [currencyCode],
  );

  const totalExpense = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data],
  );

  const chartConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {
      amount: { label: 'Expense' },
    };
    data.forEach((item, index) => {
      config[item.categoryId] = {
        label: item.categoryName,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      };
    });
    return config;
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      name: item.categoryName,
      categoryId: item.categoryId,
      amount: item.amount,
      percentage: totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(1) : '0',
      fill: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
  }, [data, totalExpense]);

  const hasData = chartData.length > 0 && totalExpense > 0;

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-4">
        <div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={PieChart01Icon}
              className="text-primary size-4.5"
            />
            <CardTitle className="text-base font-semibold">
              Expenses by Category
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Spending distribution for {timeframeLabel}.
          </CardDescription>
        </div>
        {hasData && (
          <span className="font-mono text-xs font-medium text-muted-foreground">
            Total: {formatCurrency(totalExpense)}
          </span>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="flex h-[280px] w-full items-center justify-center">
            <Skeleton className="h-[220px] w-[220px] rounded-full" />
          </div>
        ) : !hasData ? (
          <div className="flex h-[280px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <HugeiconsIcon icon={PieChart01Icon} className="size-8 opacity-40" />
            <p className="text-sm">No expense categories recorded for this period.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <ChartContainer config={chartConfig} className="h-[200px] w-full max-w-[280px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      formatter={(val, name, item) => (
                        <div className="flex w-full items-center justify-between gap-3">
                          <span className="text-muted-foreground">{name}:</span>
                          <span className="font-mono font-medium">
                            {formatCurrency(Number(val))} ({item.payload?.percentage}%)
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  strokeWidth={2}
                  stroke="var(--card)"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            {/* Custom Category Legend */}
            <div className="grid w-full grid-cols-2 gap-2 text-xs sm:grid-cols-3">
              {chartData.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-1.5 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-1.5"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="truncate text-foreground font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
