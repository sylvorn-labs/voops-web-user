import { create } from 'zustand';

import { supabase } from '@/lib/supabase';

import type { AuthStore } from './auth.d';

export const useAuthStore = create<AuthStore>(set => {
  const fetchSession = async (isRefetch = false) => {
    if (isRefetch) {
      set({ isRefetching: true });
    }

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isPending: false,
        isRefetching: false,
        error,
      });
    } else {
      set({
        user: data.session?.user ?? null,
        session: data.session ?? null,
        isAuthenticated: !!data.session?.user && !!data.session,
        isPending: false,
        isRefetching: false,
        error: null,
      });
    }
  };

  // Subscribe to Supabase auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    set({
      user: session?.user ?? null,
      session: session ?? null,
      isAuthenticated: !!session?.user && !!session,
      isPending: false,
      isRefetching: false,
      error: null,
    });
  });

  fetchSession();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      set({ error });
      return;
    }

    set({
      user: null,
      session: null,
      isAuthenticated: false,
      error: null,
    });
  };

  return {
    // Initial state
    user: null,
    session: null,
    isPending: true,
    isRefetching: false,
    error: null,
    isAuthenticated: false,

    // Actions
    refetch: () => fetchSession(true),
    logout,
    setAuthState: state => set(state),
  };
});
