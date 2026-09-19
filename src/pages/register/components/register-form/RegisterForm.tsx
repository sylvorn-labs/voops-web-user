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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert/Alert';
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
import { AuthSocialButtons } from '@/components/auth/auth-social-buttons/AuthSocialButtons';
import { registerSchema } from './register-form.schema';
import type { RegisterFormValues } from './register-form.d';

export function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
        },
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    if (data.user && !data.session) {
      navigate(`/verify?email=${encodeURIComponent(values.email)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          {serverError && (
            <Alert variant="destructive">
              <HugeiconsIcon icon={AlertCircleIcon} />
              <AlertTitle>Registration failed</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Doe"
                    autoComplete="name"
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
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Confirm Password</FormLabel>
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="size-4 animate-spin"
                />
                Creating Account...
              </>
            ) : (
              'Create account'
            )}
          </Button>

          <AuthSocialButtons label="Sign up with Google" />
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </div>
  );
}
