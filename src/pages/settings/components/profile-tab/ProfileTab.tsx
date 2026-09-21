import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FloppyDiskIcon,
  Mail01Icon,
  Loading03Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase';
import { useAuthRefetch } from '@/stores/auth/auth.selectors';
import { SplitLayout } from '@/components/dashboard/SpiltLayout';
import { DataCard } from '@/components/dashboard/data-card/DataCard';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form/Form';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/Alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/Avatar';
import { Badge } from '@/components/ui/badge/Badge';

import type { UserSettingsTabProps } from '../../types';
import {
  profileDetailsSchema,
  updateEmailSchema,
  type ProfileDetailsFormValues,
  type UpdateEmailFormValues,
} from './profile.schema';

export function ProfileTab({ user }: UserSettingsTabProps) {
  const refetchAuth = useAuthRefetch();
  const [profileServerError, setProfileServerError] = useState<string | null>(
    null,
  );
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState<string | null>(null);

  const currentFullName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    '';

  const currentAvatarUrl =
    (user?.user_metadata?.avatar_url as string) ||
    (user?.user_metadata?.picture as string) ||
    '';

  const profileForm = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: {
      fullName: currentFullName,
      avatarUrl: currentAvatarUrl,
    },
  });

  const emailForm = useForm<UpdateEmailFormValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  useEffect(() => {
    profileForm.reset({
      fullName: currentFullName,
      avatarUrl: currentAvatarUrl,
    });
  }, [currentFullName, currentAvatarUrl, profileForm]);

  useEffect(() => {
    emailForm.reset({
      email: user?.email || '',
    });
  }, [user?.email, emailForm]);

  const previewAvatarUrl =
    useWatch({
      control: profileForm.control,
      name: 'avatarUrl',
    }) || currentAvatarUrl;

  const previewFullName =
    useWatch({
      control: profileForm.control,
      name: 'fullName',
    }) || currentFullName;

  const onProfileSubmit = async (values: ProfileDetailsFormValues) => {
    setProfileServerError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: values.fullName,
          avatar_url: values.avatarUrl || null,
        },
      });

      if (error) {
        setProfileServerError(error.message);
        toast.error(error.message);
        return;
      }

      await refetchAuth();
      toast.success('Profile details updated successfully');
      profileForm.reset(values);
    } catch {
      setProfileServerError('Failed to update profile details.');
      toast.error('Failed to update profile details.');
    }
  };

  const onEmailSubmit = async (values: UpdateEmailFormValues) => {
    setEmailServerError(null);
    setEmailSuccessMsg(null);

    if (values.email === user?.email) {
      toast.info('This is already your current email address.');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        email: values.email,
      });

      if (error) {
        setEmailServerError(error.message);
        toast.error(error.message);
        return;
      }

      setEmailSuccessMsg(
        'Confirmation email sent! Please check your new email inbox to complete verification.',
      );
      toast.success('Confirmation email sent');
      await refetchAuth();
    } catch {
      setEmailServerError('Failed to update email address.');
      toast.error('Failed to update email address.');
    }
  };

  const isProfileDirty = profileForm.formState.isDirty;
  const isProfileSubmitting = profileForm.formState.isSubmitting;
  const isEmailDirty = emailForm.formState.isDirty;
  const isEmailSubmitting = emailForm.formState.isSubmitting;

  const leftContent = (
    <div className="flex flex-col gap-6">
      {/* Personal Info Card */}
      <DataCard
        title="Personal Information"
        description="Update your display name and public avatar photo."
        action={
          <Button
            size="sm"
            type="submit"
            form="profile-details-form"
            disabled={!isProfileDirty || isProfileSubmitting}
          >
            {isProfileSubmitting ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                className="mr-1 size-3.5 animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
            )}
            {isProfileSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        }
      >
        <Form {...profileForm}>
          <form
            id="profile-details-form"
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {profileServerError && (
              <Alert variant="destructive">
                <HugeiconsIcon icon={AlertCircleIcon} />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{profileServerError}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={profileForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Jane Doe"
                      disabled={isProfileSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name displayed across the dashboard and in
                    teams.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/avatar.jpg"
                      disabled={isProfileSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a direct link to an image to customize your avatar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DataCard>

      {/* Email Address Card */}
      <DataCard
        title="Email Address"
        description="Manage the email address associated with your login and notifications."
        action={
          <Button
            size="sm"
            type="submit"
            form="profile-email-form"
            disabled={!isEmailDirty || isEmailSubmitting}
          >
            {isEmailSubmitting ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                className="mr-1 size-3.5 animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={Mail01Icon} className="mr-1 size-3.5" />
            )}
            {isEmailSubmitting ? 'Updating...' : 'Update Email'}
          </Button>
        }
      >
        <Form {...emailForm}>
          <form
            id="profile-email-form"
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {emailServerError && (
              <Alert variant="destructive">
                <HugeiconsIcon icon={AlertCircleIcon} />
                <AlertTitle>Update Failed</AlertTitle>
                <AlertDescription>{emailServerError}</AlertDescription>
              </Alert>
            )}

            {emailSuccessMsg && (
              <Alert
                variant="default"
                className="border-income/40 bg-income/10 text-income"
              >
                <HugeiconsIcon icon={CheckmarkCircle02Icon} />
                <AlertTitle>Confirmation Sent</AlertTitle>
                <AlertDescription>{emailSuccessMsg}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      disabled={isEmailSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Changing your email will send a confirmation message to both
                    your old and new addresses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DataCard>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Live Preview"
        description="How your profile appears to teammates and in the dashboard header."
      >
        <div className="bg-muted/30 flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center">
          <Avatar className="h-20 w-20 rounded-2xl border shadow-sm">
            <AvatarImage src={previewAvatarUrl} alt={previewFullName} />
            <AvatarFallback className="rounded-2xl text-2xl font-bold">
              {previewFullName ? previewFullName[0]?.toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="text-base font-semibold">
              {previewFullName || 'Your Name'}
            </span>
            <span className="text-muted-foreground text-xs">{user?.email}</span>
          </div>
          <Badge variant="secondary" className="mt-1">
            Active Member
          </Badge>
        </div>
      </DataCard>
    </div>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
