import * as React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert/Alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import { PasswordRequirements } from '../password-requirements/PasswordRequirements';
import { resetPasswordSchema } from './reset-password-form.schema';
import type { ResetPasswordFormValues } from './reset-password-form.d';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue =
    useWatch({ control: form.control, name: 'password' }) || '';
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);

    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="bg-income/10 text-income mx-auto flex size-12 items-center justify-center rounded-2xl">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Password reset successful!</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Your password has been updated. Redirecting you to the sign in
            page...
          </p>
        </div>

        <Button asChild className="w-full">
          <Link to="/login">Proceed to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your new password below to secure your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {serverError && (
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} />
              <AlertTitle>Reset Failed</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
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
                    autoComplete="new-password"
                    disabled={isSubmitting}
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
              <FormItem className="grid gap-2">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
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
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordRequirements password={passwordValue} />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="size-4 animate-spin"
                />
                Updating Password...
              </>
            ) : (
              'Set New Password'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Remember your password?{' '}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  );
}
