import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircleIcon,
  Loading03Icon,
  ViewIcon,
  ViewOffSlashIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert/alert';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import { AuthSocialButtons } from '@/components/auth/auth-social-buttons/auth-social-buttons';
import { loginSchema } from './login-form.constants';
import type { LoginFormValues } from './login-form.d';

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (
        error.message.toLowerCase().includes('email not confirmed') ||
        error.message.toLowerCase().includes('unconfirmed')
      ) {
        navigate(`/verify?email=${encodeURIComponent(values.email)}`);
        return;
      }
      setServerError(error.message);
      return;
    }

    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {serverError && (
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} />
              <AlertTitle>Sign in failed</AlertTitle>
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
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
                    autoComplete="current-password"
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
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          <AuthSocialButtons label="Login with Google" />
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
