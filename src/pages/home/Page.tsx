import { House } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { useAuthIsAuthenticated } from '@/stores/auth/auth.selectors';
import { Button } from '@/components/ui/button';

export function HomePage() {
  const isAuthenticated = useAuthIsAuthenticated();

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center gap-4">
      <h1>Welcome to the Voops Web User Application!</h1>
      <p>{isAuthenticated ? 'You are logged in.' : 'You are not logged in.'}</p>
      <Button variant={'default'} size={'icon'}>
        <HugeiconsIcon icon={House} />
      </Button>
    </div>
  );
}
