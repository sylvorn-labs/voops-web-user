import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import type { BusinessStore } from './business.d';

export const useBusinessStore = create<BusinessStore>()(
  persist(
    set => ({
      activeBusinessId: null,
      setActiveBusinessId: activeBusinessId => set({ activeBusinessId }),
      resetActiveBusinessId: () => set({ activeBusinessId: null }),
    }),
    {
      name: 'business-store',
      partialize: state => ({ activeBusinessId: state.activeBusinessId }),
    },
  ),
);
