import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router';
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
  SentIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { forgotPasswordSchema } from './forgot-password-form.constants';
import type { ForgotPasswordFormValues } from './forgot-password-form.d';

export function ForgotPasswordForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState('');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError(null);

    const redirectUrl = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setSubmittedEmail(values.email);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="bg-income/10 text-income mx-auto flex size-12 items-center justify-center rounded-2xl">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We sent a password reset link to{' '}
            <strong className="text-foreground font-semibold">
              {submittedEmail}
            </strong>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsSuccess(false);
              form.reset({ email: submittedEmail });
            }}
          >
            <HugeiconsIcon icon={SentIcon} />
            Resend Email
          </Button>

          <div className="pt-2 text-center text-sm">
            <Link to="/login" className="underline underline-offset-4">
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below and we will send you a reset link
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {serverError && (
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} />
              <AlertTitle>Reset Request Failed</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="size-4 animate-spin"
                />
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
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
