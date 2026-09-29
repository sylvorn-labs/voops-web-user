import { HugeiconsIcon } from '@hugeicons/react';
import {
  PlusSignIcon,
  Wallet02Icon,
  Calendar01Icon,
  CoinsSwapIcon,
} from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/dashboard/page-header/PageHeader';
import { Button } from '@/components/ui/button/Button';
import { Badge } from '@/components/ui/badge/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';

export type DashboardTimeframe = '30d' | 'month' | '90d' | 'all';

interface DashboardHeaderProps {
  businessName?: string;
  currencyCode?: string;
  timeframe: DashboardTimeframe;
  onTimeframeChange: (val: DashboardTimeframe) => void;
}

export function DashboardHeader({
  businessName,
  currencyCode = 'INR',
  timeframe,
  onTimeframeChange,
}: DashboardHeaderProps) {
  const openSheet = useSheetOpen();

  const handleAddTransaction = () => {
    openSheet({
      sheetKey: 'transaction',
      mode: 'add',
      title: 'Record Transaction',
      description: 'Record an income or expense transaction.',
    });
  };

  const handleAddAccount = () => {
    openSheet({
      sheetKey: 'account',
      mode: 'add',
      title: 'Add Account',
      description: 'Create a new bank, cash, or wallet account.',
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <PageHeader
            title="Overview"
            description={
              businessName
                ? `Financial performance, cashflow, and activity for ${businessName}.`
                : 'Financial performance and cashflow overview.'
            }
          />
          {businessName && (
            <Badge variant="outline" className="hidden font-mono sm:inline-flex">
              {currencyCode}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-[150px]">
          <Select
            value={timeframe}
            onValueChange={val => onTimeframeChange(val as DashboardTimeframe)}
          >
            <SelectTrigger className="w-full h-9">
              <HugeiconsIcon
                icon={Calendar01Icon}
                className="text-muted-foreground mr-1 size-3.5"
              />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={handleAddAccount}
        >
          <HugeiconsIcon icon={Wallet02Icon} className="mr-1 size-3.5" />
          <span className="hidden sm:inline">Add Account</span>
          <span className="sm:hidden">Account</span>
        </Button>

        <Button size="sm" className="h-9" onClick={handleAddTransaction}>
          <HugeiconsIcon icon={PlusSignIcon} className="mr-1 size-3.5" />
          <HugeiconsIcon icon={CoinsSwapIcon} className="mr-1 size-3.5 hidden sm:inline" />
          Transaction
        </Button>
      </div>
    </div>
  );
}
