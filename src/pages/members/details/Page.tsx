import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
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
import { getMemberByIdOptions } from '@/hooks/api/member.hook';

import { MemberDeleteDialog } from '@/pages/members/components/member-delete-dialog/MemberDeleteDialog';
import { MemberBasicTab } from './components/member-basic-tab/MemberBasicTab';

export function MemberDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getMemberByIdOptions(id || ''),
  );

  const member = data?.data;

  useEffect(() => {
    if (member) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Members', href: '/dashboard/members' },
        { label: member.email },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Members', href: '/dashboard/members' },
      ]);
    }
  }, [member, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading member details..." />;
  }

  if (isError || !member) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Member not found"
          description="The requested member does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Members',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/members'),
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
      sheetKey: 'member',
      mode: 'edit',
      id: member.id,
      title: 'Edit Member Role',
      description: 'Update member permissions for this workspace.',
    });
  };

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <MemberBasicTab member={member} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title: member.email,
          description:
            'Workspace role assignments, permissions, and system metadata.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/members')}
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
                    Edit Role
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <MemberDeleteDialog
        member={member}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/members')}
      />
    </>
  );
}
