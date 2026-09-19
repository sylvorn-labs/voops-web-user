import { Link } from 'react-router';
import {
  House,
  Logout01Icon,
  SparklesIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  useAuthIsAuthenticated,
  useAuthLogout,
  useAuthUser,
} from '@/stores/auth/auth.selectors';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function HomePage() {
  const isAuthenticated = useAuthIsAuthenticated();
  const user = useAuthUser();
  const logout = useAuthLogout();

  return (
    <div className="bg-background flex min-h-dvh w-full flex-col items-center justify-center p-4 sm:p-8">
      <Card className="border-border/80 w-full max-w-lg shadow-md">
        <CardHeader className="space-y-2 text-center">
          <div className="bg-primary text-primary-foreground shadow-primary/20 mx-auto flex size-12 items-center justify-center rounded-2xl shadow-md">
            <HugeiconsIcon icon={SparklesIcon} className="size-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight">
            Voops Web Application
          </CardTitle>
          <CardDescription>
            {isAuthenticated
              ? `Logged in as ${user?.email}`
              : 'You are currently not logged in.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="border-border/70 bg-muted/30 text-muted-foreground flex items-center justify-center gap-2 rounded-xl border p-3 text-xs">
            <HugeiconsIcon icon={House} className="text-primary size-4" />
            <span>
              Auth Status:{' '}
              <strong
                className={
                  isAuthenticated
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-foreground'
                }
              >
                {isAuthenticated ? 'Authenticated' : 'Guest'}
              </strong>
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs font-semibold">
              Authentication Pages:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/verify">Verify</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/forgot-password">Forgot Pass</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/reset-password">Reset Pass</Link>
              </Button>
            </div>
          </div>

          {isAuthenticated ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => logout()}
            >
              <HugeiconsIcon icon={Logout01Icon} />
              Sign Out
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link to="/login">
                <HugeiconsIcon icon={UserIcon} />
                Get Started
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
