import { useEffect } from 'react';
import {
  AccountSetting01Icon,
  ShieldIcon,
  UserIcon,
  ComputerIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { DetailsLayout } from '@/layouts/dashboard-detail/DetailsLayout';
import { Loading } from '@/components/global/Loading';
import { useSetBreadcrumbs } from '@/stores/breadcrumbs/breadcrumbs.selectors';
import {
  useAuthIsLoading,
  useAuthSession,
  useAuthUser,
} from '@/stores/auth/auth.selectors';

import { OverviewTab } from './components/overview-tab/OverviewTab';
import { ProfileTab } from './components/profile-tab/ProfileTab';
import { SecurityTab } from './components/security-tab/SecurityTab';
import { SessionsTab } from './components/sessions-tab/SessionsTab';

export function SettingsPage() {
  const setBreadcrumbs = useSetBreadcrumbs();
  const user = useAuthUser();
  const session = useAuthSession();
  const isLoading = useAuthIsLoading();

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Settings' },
    ]);
  }, [setBreadcrumbs]);

  if (isLoading && !user) {
    return <Loading message="Loading account settings..." />;
  }

  const tabs = [
    {
      value: 'overview',
      label: (
        <span className="flex items-center gap-1.5">
          <HugeiconsIcon icon={AccountSetting01Icon} className="size-4" />
          Overview
        </span>
      ),
      content: <OverviewTab user={user} session={session} />,
    },
    {
      value: 'profile',
      label: (
        <span className="flex items-center gap-1.5">
          <HugeiconsIcon icon={UserIcon} className="size-4" />
          Profile
        </span>
      ),
      content: <ProfileTab user={user} session={session} />,
    },
    {
      value: 'security',
      label: (
        <span className="flex items-center gap-1.5">
          <HugeiconsIcon icon={ShieldIcon} className="size-4" />
          Security
        </span>
      ),
      content: <SecurityTab user={user} session={session} />,
    },
    {
      value: 'sessions',
      label: (
        <span className="flex items-center gap-1.5">
          <HugeiconsIcon icon={ComputerIcon} className="size-4" />
          Sessions
        </span>
      ),
      content: <SessionsTab user={user} session={session} />,
    },
  ];

  return (
    <DetailsLayout
      header={{
        title: 'Account Settings',
        description:
          'Manage your profile, login credentials, and active device sessions.',
      }}
      defaultTab="overview"
      tabs={tabs}
    />
  );
}
