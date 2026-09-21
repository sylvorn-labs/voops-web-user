import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import {
  useAuthIsAuthenticated,
  useAuthIsLoading,
} from '@/stores/auth/auth.selectors';

import { Loading } from '@/components/global/Loading';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAuthIsAuthenticated();
  const isPending = useAuthIsLoading();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isPending, isAuthenticated, navigate]);

  if (isPending) {
    return <Loading message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
