import {
  ComputerIcon,
  Logout03Icon,
  RefreshIcon,
  ShieldAlertIcon,
  Loading03Icon,
} from '@hugeicons/core-free-icons';

import { HugeiconsIcon } from '@hugeicons/react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog/AlertDialog';

import { DataCardPropertyRow } from '@/components/dashboard/data-card/DataCardPropertyRow';
import { useAuthLogout, useAuthRefetch } from '@/stores/auth/auth.selectors';
import { DataCard } from '@/components/dashboard/data-card/DataCard';
import { SplitLayout } from '@/components/dashboard/SpiltLayout';
import { Button } from '@/components/ui/button/Button';
import { Badge } from '@/components/ui/badge/Badge';
import { supabase } from '@/lib/supabase';

import type { UserSettingsTabProps } from '../../types';

export function SessionsTab({ session }: UserSettingsTabProps) {
  const navigate = useNavigate();
  const refetch = useAuthRefetch();
  const logout = useAuthLogout();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRevokingOthers, setIsRevokingOthers] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  const expiresAtDate = session?.expires_at
    ? new Date(session.expires_at * 1000)
    : null;

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success('Session token refreshed successfully');
    } catch {
      toast.error('Failed to refresh session');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSignOutOthers = async () => {
    setIsRevokingOthers(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'others' });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Signed out from all other devices');
      }
    } catch {
      toast.error('Failed to sign out other sessions');
    } finally {
      setIsRevokingOthers(false);
    }
  };

  const handleSignOutGlobal = async () => {
    setIsRevokingAll(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        toast.error(error.message);
      } else {
        await logout();
        navigate('/', { replace: true });
        toast.success('Signed out from all sessions');
      }
    } catch {
      toast.error('Failed to sign out everywhere');
    } finally {
      setIsRevokingAll(false);
    }
  };

  const userAgent =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown Browser';

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Active Session"
        description="Details about your current browsing session on this device."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshToken}
            disabled={isRefreshing}
          >
            <HugeiconsIcon
              icon={isRefreshing ? Loading03Icon : RefreshIcon}
              className={`mr-1 size-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            {isRefreshing ? 'Refreshing...' : 'Refresh Token'}
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="bg-muted/30 flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <HugeiconsIcon icon={ComputerIcon} className="size-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Current Device</span>
                  <Badge variant="income" className="text-[10px]">
                    Current Session
                  </Badge>
                </div>
                <span className="text-muted-foreground text-xs">
                  {userAgent.length > 60
                    ? `${userAgent.slice(0, 60)}...`
                    : userAgent}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-3">
            <DataCardPropertyRow
              label="Session State"
              value={
                <Badge variant={session ? 'income' : 'destructive'}>
                  {session ? 'Active & Valid' : 'Inactive'}
                </Badge>
              }
            />
            <DataCardPropertyRow
              label="Token Expiry"
              value={
                <span className="text-foreground text-xs font-medium">
                  {expiresAtDate ? format(expiresAtDate, 'PPpp') : 'Unknown'}
                </span>
              }
            />
            <DataCardPropertyRow
              label="Token Type"
              value={
                <Badge variant="outline" className="uppercase">
                  {session?.token_type || 'Bearer'}
                </Badge>
              }
            />
          </div>
        </div>
      </DataCard>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Session Security Actions"
        description="Manage connected sessions across your other computers and mobile devices."
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">
                Sign out of other devices
              </span>
              <p className="text-muted-foreground text-xs">
                Revoke access from all browsers and devices except this current
                one.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOutOthers}
              disabled={isRevokingOthers}
            >
              {isRevokingOthers ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="mr-1 size-3.5 animate-spin"
                />
              ) : (
                <HugeiconsIcon icon={Logout03Icon} className="mr-1 size-3.5" />
              )}
              {isRevokingOthers ? 'Signing Out...' : 'Sign Out Others'}
            </Button>
          </div>

          <div className="border-destructive/20 bg-destructive/5 flex items-center justify-between rounded-lg border p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-destructive text-sm font-semibold">
                Sign out of everywhere
              </span>
              <p className="text-muted-foreground text-xs">
                Immediately invalidate all active sessions everywhere, including
                this device.
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isRevokingAll}
                >
                  <HugeiconsIcon
                    icon={ShieldAlertIcon}
                    className="mr-1 size-3.5"
                  />
                  Sign Out Everywhere
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out of all sessions?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will terminate your current session on this device and
                    all other active browser sessions. You will be redirected to
                    the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleSignOutGlobal}
                  >
                    Confirm & Sign Out Everywhere
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DataCard>
    </div>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
