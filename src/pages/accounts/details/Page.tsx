import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Archive02Icon,
  ArchiveRestoreIcon,
  ArrowLeft01Icon,
  Delete02Icon,
  Edit02Icon,
  MoreHorizontalIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DetailsLayout } from '@/layouts/dashboard-detail/DetailsLayout';
import { Button } from '@/components/ui/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu';
import { Loading } from '@/components/global/Loading';
import { Error } from '@/components/global/Error';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import {
  getAccountByIdOptions,
  useToggleArchiveAccount,
} from '@/hooks/api/account.hook';

import { AccountDeleteDialog } from '@/pages/accounts/components/account-delete-dialog/AccountDeleteDialog';
import { AccountBasicTab } from './components/account-basic-tab/AccountBasicTab';

export function AccountDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveAccount();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getAccountByIdOptions(id || ''),
  );

  const account = data?.data;

  useEffect(() => {
    if (account) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Accounts', href: '/dashboard/accounts' },
        { label: account.name },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Accounts', href: '/dashboard/accounts' },
      ]);
    }
  }, [account, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading account details..." />;
  }

  if (isError || !account) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Account not found"
          description="The requested account does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Accounts',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/accounts'),
          }}
          secondaryAction={{
            label: 'Try Again',
            icon: RefreshIcon,
            onClick: () => void refetch(),
          }}
        />
      </div>
    );
  }

  const handleEditInSheet = () => {
    openSheet({
      sheetKey: 'account',
      mode: 'edit',
      id: account.id,
      title: 'Edit Account',
      description: 'Update account details and balance.',
    });
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({
      id: account.id,
      is_archived: !account.is_archived,
    });
  };

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <AccountBasicTab account={account} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title: account.name,
          description: 'Account settings, balance, and audit details.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/accounts')}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-1 size-4" />
                Back
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="size-8 p-0">
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      className="size-4"
                    />
                    <span className="sr-only">Open actions menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-fit min-w-[170px]"
                >
                  <DropdownMenuItem
                    onClick={handleEditInSheet}
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                    Edit account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleToggleArchive}
                    className="w-full"
                  >
                    <HugeiconsIcon
                      icon={
                        account.is_archived ? ArchiveRestoreIcon : Archive02Icon
                      }
                      className="size-4"
                    />
                    {account.is_archived
                      ? 'Restore account'
                      : 'Archive account'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Delete account
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <AccountDeleteDialog
        account={account}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/accounts')}
      />
    </>
  );
}
