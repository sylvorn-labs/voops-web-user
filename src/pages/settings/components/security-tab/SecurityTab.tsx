import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Key01Icon,
  Loading03Icon,
  Tick02Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase';
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
} from '@/components/ui/form/Form';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/Alert';
import { cn } from '@/lib/utils';

import type { UserSettingsTabProps } from '../../types';
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from './security.schema';

export function SecurityTab({ user }: UserSettingsTabProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue =
    useWatch({
      control: form.control,
      name: 'password',
    }) || '';

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        setServerError(error.message);
        toast.error(error.message);
        return;
      }

      setSuccessMessage('Your password has been successfully changed.');
      toast.success('Password updated successfully');
      form.reset();
    } catch {
      setServerError(
        'An unexpected error occurred while updating your password.',
      );
      toast.error('Failed to update password');
    }
  };

  const requirements = [
    {
      label: 'At least 8 characters long',
      valid: passwordValue.length >= 8,
    },
    {
      label: 'At least 1 uppercase letter',
      valid: /[A-Z]/.test(passwordValue),
    },
    {
      label: 'At least 1 number',
      valid: /[0-9]/.test(passwordValue),
    },
    {
      label: 'At least 1 special character',
      valid: /[^A-Za-z0-9]/.test(passwordValue),
    },
  ];

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Change Password"
        description="Ensure your account is using a long, random password to stay secure."
        action={
          <Button
            size="sm"
            type="submit"
            form="change-password-form"
            disabled={isSubmitting || !passwordValue}
          >
            {isSubmitting ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                className="mr-1 size-3.5 animate-spin"
              />
            ) : (
              <HugeiconsIcon icon={Key01Icon} className="mr-1 size-3.5" />
            )}
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="change-password-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {serverError && (
              <Alert variant="destructive">
                <HugeiconsIcon icon={AlertCircleIcon} />
                <AlertTitle>Update Failed</AlertTitle>
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="border-income/40 bg-income/10 text-income">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      endSlot={
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          <HugeiconsIcon
                            icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                            className="size-4"
                          />
                        </button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      endSlot={
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(prev => !prev)}
                          className="text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
                          aria-label={
                            showConfirmPassword
                              ? 'Hide password'
                              : 'Show password'
                          }
                        >
                          <HugeiconsIcon
                            icon={
                              showConfirmPassword ? ViewOffSlashIcon : ViewIcon
                            }
                            className="size-4"
                          />
                        </button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-border/70 bg-muted/30 space-y-1.5 rounded-xl border p-3.5 text-xs">
              <p className="text-foreground/80 mb-2 font-semibold">
                Password Requirements:
              </p>
              <ul className="space-y-1.5">
                {requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className={cn(
                      'flex items-center gap-2 transition-colors',
                      req.valid
                        ? 'text-income font-medium'
                        : 'text-muted-foreground',
                    )}
                  >
                    <HugeiconsIcon
                      icon={req.valid ? CheckmarkCircle02Icon : Tick02Icon}
                      className={cn(
                        'size-3.5 shrink-0',
                        req.valid ? 'text-income' : 'text-muted-foreground/40',
                      )}
                    />
                    <span>{req.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </Form>
      </DataCard>
    </div>
  );

  const rightContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Password Reset by Email"
        description="Forgot your current password or locked out?"
      >
        <div className="text-muted-foreground flex flex-col gap-3 text-xs leading-relaxed">
          <p>
            You can trigger a password recovery link to your registered email (
            <span className="text-foreground font-medium">{user?.email}</span>)
            whenever you need to regain access.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              if (!user?.email) return;
              try {
                const { error } = await supabase.auth.resetPasswordForEmail(
                  user.email,
                  {
                    redirectTo: `${window.location.origin}/reset-password`,
                  },
                );
                if (error) {
                  toast.error(error.message);
                } else {
                  toast.success('Password reset link sent to your email');
                }
              } catch {
                toast.error('Failed to send reset email');
              }
            }}
          >
            Send Reset Link to Email
          </Button>
        </div>
      </DataCard>
    </div>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
