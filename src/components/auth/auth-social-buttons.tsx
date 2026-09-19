import * as React from 'react';
import { GoogleIcon, Loading03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface AuthSocialButtonsProps {
  label?: string;
}

export function AuthSocialButtons({
  label = 'Login with Google',
}: AuthSocialButtonsProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOAuthLogin = async (provider: 'google') => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('google')}
        disabled={isLoading}
      >
        {isLoading ? (
          <HugeiconsIcon icon={Loading03Icon} className="size-4 animate-spin" />
        ) : (
          <HugeiconsIcon icon={GoogleIcon} className="size-4" />
        )}
        {label}
      </Button>
    </>
  );
}
