import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, Link, useNavigate } from 'react-router';
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
  Mail02Icon,
  SentIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert/Alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import { useAuthIsAuthenticated } from '@/stores/auth/auth.selectors';
import { ResendTimer } from '../resend-timer/ResendTimer';
import { emailSchema } from './verify-form.schema';
import type { EmailFormValues } from './verify-form.d';

export function VerifyForm() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryEmail = searchParams.get('email') || '';

  const isAuthenticated = useAuthIsAuthenticated();
  const [feedback, setFeedback] = React.useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: queryEmail,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSendVerification = async (values: EmailFormValues) => {
    setFeedback(null);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: values.email,
    });

    if (error) {
      setFeedback({ type: 'error', text: error.message });
      return;
    }

    setSearchParams({ email: values.email });
    setFeedback({
      type: 'success',
      text: 'Verification link sent to your email.',
    });
  };

  // If email is provided in query params, display the verification status screen
  if (queryEmail) {
    return (
      <div className="flex flex-col gap-6">
        <div className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-2xl">
          <HugeiconsIcon icon={Mail02Icon} className="size-6" />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We sent a verification link to{' '}
            <strong className="text-foreground font-semibold">
              {queryEmail}
            </strong>
          </p>
        </div>

        {feedback && (
          <Alert
            variant={feedback.type === 'error' ? 'destructive' : 'success'}
          >
            <HugeiconsIcon
              icon={
                feedback.type === 'error'
                  ? AlertCircleIcon
                  : CheckmarkCircle02Icon
              }
            />
            <AlertTitle>
              {feedback.type === 'error' ? 'Notice' : 'Success'}
            </AlertTitle>
            <AlertDescription>{feedback.text}</AlertDescription>
          </Alert>
        )}

        <div className="text-muted-foreground flex flex-col gap-4 text-center text-sm">
          <p className="text-balance">
            Please check your inbox and click the link to verify your account
            and sign in.
          </p>

          <div className="pt-2">
            <ResendTimer
              email={queryEmail}
              onMessage={msg => setFeedback(msg)}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchParams({});
              setFeedback(null);
            }}
            className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
          >
            Use a different email address
          </button>
        </div>

        <div className="text-center text-sm">
          <Link to="/login" className="underline underline-offset-4">
            Back to Sign in
          </Link>
        </div>
      </div>
    );
  }

  // Fallback: If no email in query params, show form to send verification link
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to receive a verification link
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSendVerification)}
          className="grid gap-6"
        >
          {feedback && (
            <Alert
              variant={feedback.type === 'error' ? 'destructive' : 'success'}
            >
              <HugeiconsIcon
                icon={
                  feedback.type === 'error'
                    ? AlertCircleIcon
                    : CheckmarkCircle02Icon
                }
              />
              <AlertTitle>
                {feedback.type === 'error' ? 'Request Failed' : 'Success'}
              </AlertTitle>
              <AlertDescription>{feedback.text}</AlertDescription>
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
                Sending Verification Link...
              </>
            ) : (
              <>
                <HugeiconsIcon icon={SentIcon} className="size-4" />
                Send Verification Link
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Back to{' '}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  );
}
