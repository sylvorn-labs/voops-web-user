import type * as React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card';
import { Skeleton } from '@/components/ui/skeleton/Skeleton';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: React.ReactNode;
  icon: unknown;
  iconClassName?: string;
  iconContainerClassName?: string;
  isLoading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  badge,
  icon,
  iconClassName,
  iconContainerClassName,
  isLoading,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-9 rounded-xl" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-3 w-48" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group relative overflow-hidden rounded-2xl transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-xl transition-colors',
            iconContainerClassName || 'bg-muted text-foreground',
          )}
        >
          <HugeiconsIcon
            icon={icon as never}
            className={cn('size-4.5', iconClassName)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-foreground font-mono text-2xl font-bold tracking-tight">
            {value}
          </span>
          {badge}
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
