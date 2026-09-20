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
  getPartyByIdOptions,
  useToggleArchiveParty,
} from '@/hooks/api/party.hook';

import { PartyDeleteDialog } from '@/pages/parties/components/party-delete-dialog/PartyDeleteDialog';
import { PartyBasicTab } from './components/party-basic-tab/PartyBasicTab';

export function PartyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const openSheet = useSheetOpen();
  const setBreadcrumbs = useSetBreadcrumbs();
  const toggleArchiveMutation = useToggleArchiveParty();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery(
    getPartyByIdOptions(id || ''),
  );

  const party = data?.data;

  useEffect(() => {
    if (party) {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Parties', href: '/dashboard/parties' },
        { label: party.name },
      ]);
    } else {
      setBreadcrumbs([
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Parties', href: '/dashboard/parties' },
      ]);
    }
  }, [party, setBreadcrumbs]);

  if (isLoading) {
    return <Loading message="Loading party details..." />;
  }

  if (isError || !party) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Error
          title="Party not found"
          description="The requested party does not exist, was removed, or you do not have permission to view it."
          primaryAction={{
            label: 'Back to Parties',
            icon: ArrowLeft01Icon,
            onClick: () => navigate('/dashboard/parties'),
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
      sheetKey: 'party',
      mode: 'edit',
      id: party.id,
      title: 'Edit Party',
      description: 'Update party details and contact information.',
    });
  };

  const handleToggleArchive = () => {
    toggleArchiveMutation.mutate({
      id: party.id,
      is_archived: !party.is_archived,
    });
  };

  const tabs = [
    {
      value: 'basic',
      label: 'Basic',
      content: <PartyBasicTab party={party} />,
    },
  ];

  return (
    <>
      <DetailsLayout
        header={{
          title: party.name,
          description:
            'Party configuration, contact details, and system metadata.',
          opposite: (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/parties')}
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
                    Edit party
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleToggleArchive}
                    className="w-full"
                  >
                    <HugeiconsIcon
                      icon={
                        party.is_archived ? ArchiveRestoreIcon : Archive02Icon
                      }
                      className="size-4"
                    />
                    {party.is_archived ? 'Restore party' : 'Archive party'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    variant="destructive"
                    className="w-full"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    Delete party
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ),
        }}
        defaultTab="basic"
        tabs={tabs}
      />

      <PartyDeleteDialog
        party={party}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => navigate('/dashboard/parties')}
      />
    </>
  );
}
