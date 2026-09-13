import { useAuthStore } from './auth.store';

export const useAuthIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const useAuthSession = () => useAuthStore(state => state.session);
export const useAuthUser = () => useAuthStore(state => state.user);
export const useAuthIsLoading = () =>
  useAuthStore(state => state.isPending || state.isRefetching);
export const useAuthError = () => useAuthStore(state => state.error);
export const useAuthLogout = () => useAuthStore(state => state.logout);
export const useAuthRefetch = () => useAuthStore(state => state.refetch);
export const useAuthSetAuthState = () =>
  useAuthStore(state => state.setAuthState);
