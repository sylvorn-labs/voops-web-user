import { format } from 'date-fns';
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  ShieldIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { SplitLayout } from '@/components/dashboard/SpiltLayout';
import { DataCard } from '@/components/dashboard/data-card/DataCard';
import { DataCardField } from '@/components/dashboard/data-card/DataCardField';
import { DataCardIdField } from '@/components/dashboard/data-card/DataCardIdField';
import { DataCardPropertyRow } from '@/components/dashboard/data-card/DataCardPropertyRow';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar';
import { Badge } from '@/components/ui/badge/Badge';

import type { UserSettingsTabProps } from '../../types';

export function OverviewTab({ user, session }: UserSettingsTabProps) {
  if (!user) {
    return null;
  }

  const fullName =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    'Not provided';

  const avatarUrl =
    (user.user_metadata?.avatar_url as string) ||
    (user.user_metadata?.picture as string) ||
    undefined;

  const isEmailConfirmed = Boolean(user.email_confirmed_at);
  const provider = user.app_metadata?.provider || 'email';
  const role = user.role || 'authenticated';

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Never';
    try {
      return format(new Date(dateString), 'PPpp');
    } catch {
      return dateString;
    }
  };

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Account Identity"
        description="Public and profile details associated with your account."
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-xl border">
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback className="rounded-xl text-lg font-semibold">
                {fullName !== 'Not provided'
                  ? fullName[0]?.toUpperCase()
                  : (user.email?.[0]?.toUpperCase() ?? 'U')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">{fullName}</span>
                <Badge variant={isEmailConfirmed ? 'income' : 'warning'}>
                  <HugeiconsIcon
                    icon={
                      isEmailConfirmed ? CheckmarkCircle02Icon : AlertCircleIcon
                    }
                    className="size-3"
                  />
                  {isEmailConfirmed ? 'Verified' : 'Unverified'}
                </Badge>
              </div>
              <span className="text-muted-foreground text-sm">
                {user.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4">
            <DataCardPropertyRow
              label="Account Role"
              value={
                <Badge variant="secondary" className="capitalize">
                  {role}
                </Badge>
              }
            />
            <DataCardPropertyRow
              label="Sign-in Provider"
              value={
                <Badge variant="outline" className="capitalize">
                  {provider}
                </Badge>
              }
            />
            <DataCardPropertyRow
              label="Last Sign In"
              value={
                <span className="text-sm font-medium">
                  {formatDate(user.last_sign_in_at)}
                </span>
              }
            />
          </div>
        </div>
      </DataCard>

      <DataCard
        title="Security & Verification"
        description="Read-only authentication and verification state."
      >
        <div className="flex flex-col gap-3">
          <DataCardPropertyRow
            label="Email Verification"
            value={
              <Badge variant={isEmailConfirmed ? 'income' : 'destructive'}>
                {isEmailConfirmed ? 'Confirmed' : 'Pending Confirmation'}
              </Badge>
            }
          />
          <DataCardPropertyRow
            label="Phone Verification"
            value={
              <Badge variant="secondary">
                {user.phone ? 'Registered' : 'Not Configured'}
              </Badge>
            }
          />
          <DataCardPropertyRow
            label="Session Status"
            value={
              <Badge variant={session ? 'income' : 'secondary'}>
                {session ? 'Active' : 'Expired'}
              </Badge>
            }
          />
        </div>
      </DataCard>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="System Metadata"
        description="Unique identifiers and system audit information."
      >
        <div className="flex flex-col gap-4">
          <DataCardIdField id={user.id} label="User ID" />

          <div className="flex flex-col gap-3 border-t pt-3">
            <DataCardField
              label="Primary Email"
              value={user.email ?? 'None'}
              copyable
            />
            {user.phone && (
              <DataCardField label="Phone Number" value={user.phone} copyable />
            )}
            <DataCardPropertyRow
              label="Account Created"
              value={
                <span className="text-muted-foreground text-xs">
                  {formatDate(user.created_at)}
                </span>
              }
            />
            <DataCardPropertyRow
              label="Profile Updated"
              value={
                <span className="text-muted-foreground text-xs">
                  {formatDate(user.updated_at)}
                </span>
              }
            />
            {user.email_confirmed_at && (
              <DataCardPropertyRow
                label="Email Confirmed"
                value={
                  <span className="text-muted-foreground text-xs">
                    {formatDate(user.email_confirmed_at)}
                  </span>
                }
              />
            )}
          </div>
        </div>
      </DataCard>

      <DataCard
        title="Connected Accounts"
        description="Third-party identity and SSO integrations."
      >
        <div className="flex flex-col gap-3">
          {user.identities && user.identities.length > 0 ? (
            user.identities.map(identity => (
              <div
                key={identity.identity_id}
                className="bg-muted/40 flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-background flex size-8 items-center justify-center rounded-md border">
                    <HugeiconsIcon
                      icon={
                        identity.provider === 'email' ? UserIcon : ShieldIcon
                      }
                      className="size-4"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold capitalize">
                      {identity.provider}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {(identity.identity_data?.email as string) ||
                        identity.id ||
                        'Connected'}
                    </span>
                  </div>
                </div>
                <Badge variant="income" className="text-[10px]">
                  Connected
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-xs">
              No third-party identities found.
            </p>
          )}
        </div>
      </DataCard>
    </div>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
