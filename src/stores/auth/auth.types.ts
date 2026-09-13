import type { AuthError, Session, User } from '@supabase/supabase-js';

export type AuthState = {
  user: User | null;
  session: Session | null;
  isPending: boolean;
  isRefetching: boolean;
  error: AuthError | Error | null;
  isAuthenticated: boolean;
};

export type AuthActions = {
  refetch: () => Promise<void>;
  logout: () => Promise<void>;
  setAuthState: (state: Partial<AuthState>) => void;
};

export type AuthStore = AuthState & AuthActions;
