import { HugeiconsIcon } from '@hugeicons/react';
import {
  CoinsSwapIcon,
  Wallet02Icon,
  Tag01Icon,
  Folder01Icon,
  UserGroupIcon,
  Mail01Icon,
} from '@hugeicons/core-free-icons';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button/Button';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';

export function DashboardQuickActions() {
  const openSheet = useSheetOpen();

  const actions = [
    {
      label: 'Record Transaction',
      icon: CoinsSwapIcon,
      onClick: () =>
        openSheet({
          sheetKey: 'transaction',
          mode: 'add',
          title: 'Record Transaction',
          description: 'Record an income or expense transaction.',
        }),
    },
    {
      label: 'New Account',
      icon: Wallet02Icon,
      onClick: () =>
        openSheet({
          sheetKey: 'account',
          mode: 'add',
          title: 'Add Account',
          description: 'Create a bank, cash, or credit account.',
        }),
    },
    {
      label: 'New Category',
      icon: Tag01Icon,
      onClick: () =>
        openSheet({
          sheetKey: 'category',
          mode: 'add',
          title: 'Add Category',
          description: 'Add a new income or expense category.',
        }),
    },
    {
      label: 'New Project',
      icon: Folder01Icon,
      onClick: () =>
        openSheet({
          sheetKey: 'project',
          mode: 'add',
          title: 'Add Project',
          description: 'Track revenue and expenses by project.',
        }),
    },
    {
      label: 'New Party',
      icon: UserGroupIcon,
      onClick: () =>
        openSheet({
          sheetKey: 'party',
          mode: 'add',
          title: 'Add Party',
          description: 'Add a client, vendor, or contractor.',
        }),
    },
    {
      label: 'Invite Member',
      icon: Mail01Icon,
      onClick: () =>
        openSheet({
          sheetKey: 'member',
          mode: 'add',
          title: 'Invite Team Member',
          description: 'Invite a collaborator to this workspace.',
        }),
    },
  ];

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {actions.map((act, i) => (
            <Button
              key={i}
              variant="outline"
              size="sm"
              onClick={act.onClick}
              className="h-10 justify-start gap-2 rounded-xl text-xs hover:bg-muted font-normal"
            >
              <HugeiconsIcon icon={act.icon} className="size-4 text-primary shrink-0" />
              <span className="truncate">{act.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
