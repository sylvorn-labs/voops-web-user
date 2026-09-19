import * as React from 'react';
import { Loading03Icon, RefreshIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button/Button';
import type { ResendTimerProps } from './resend-timer.d';

export function ResendTimer({ email, onMessage }: ResendTimerProps) {
  const [countdown, setCountdown] = React.useState(0);
  const [isResending, setIsResending] = React.useState(false);

  React.useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email || countdown > 0 || isResending) return;

    setIsResending(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    setIsResending(false);

    if (error) {
      onMessage?.({ type: 'error', text: error.message });
    } else {
      setCountdown(60);
      onMessage?.({
        type: 'success',
        text: 'A new verification link has been sent to your email.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleResend}
        disabled={!email || countdown > 0 || isResending}
      >
        {isResending ? (
          <>
            <HugeiconsIcon
              icon={Loading03Icon}
              className="size-4 animate-spin"
            />
            Resending Email...
          </>
        ) : countdown > 0 ? (
          <span>Resend available in {countdown}s</span>
        ) : (
          <>
            <HugeiconsIcon icon={RefreshIcon} className="size-4" />
            Resend Verification Email
          </>
        )}
      </Button>
    </div>
  );
}
