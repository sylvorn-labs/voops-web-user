import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChartLineData02Icon } from '@hugeicons/core-free-icons';

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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart/Chart';
import type { ChartConfig } from '@/components/ui/chart/chart.d';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';

export interface CashFlowDataPoint {
  date: string;
  formattedDate: string;
  inflow: number;
  outflow: number;
}

interface CashFlowChartProps {
  data: CashFlowDataPoint[];
  currencyCode?: string;
  timeframeLabel: string;
  isLoading?: boolean;
}

const chartConfig: ChartConfig = {
  inflow: {
    label: 'Inflow (Income)',
    color: 'oklch(0.696 0.17 162.48)', // emerald
  },
  outflow: {
    label: 'Outflow (Expense)',
    color: 'oklch(0.637 0.237 25.331)', // rose
  },
};

export function CashFlowChart({
  data,
  currencyCode = 'INR',
  timeframeLabel,
  isLoading,
}: CashFlowChartProps) {
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

  const hasData = data.length > 0 && data.some(d => d.inflow > 0 || d.outflow > 0);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-4">
        <div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ChartLineData02Icon}
              className="text-primary size-4.5"
            />
            <CardTitle className="text-base font-semibold">
              Cash Flow Trend
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            Daily income vs. expense comparison for {timeframeLabel}.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="flex h-[280px] w-full items-center justify-center">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : !hasData ? (
          <div className="flex h-[280px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <HugeiconsIcon icon={ChartLineData02Icon} className="size-8 opacity-40" />
            <p className="text-sm">No transaction activity recorded for this period.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillInflow" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.696 0.17 162.48)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.696 0.17 162.48)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
                <linearGradient id="fillOutflow" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.637 0.237 25.331)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.637 0.237 25.331)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={val => val}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={val => formatCurrency(val)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={value => value}
                    formatter={(val, name) => (
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-muted-foreground">{name}:</span>
                        <span className="font-mono font-medium">
                          {formatCurrency(Number(val))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="inflow"
                stroke="oklch(0.696 0.17 162.48)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#fillInflow)"
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stroke="oklch(0.637 0.237 25.331)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#fillOutflow)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
