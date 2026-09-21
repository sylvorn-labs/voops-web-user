import { useBusinessStore } from './business.store';

export const useActiveBusinessId = () =>
  useBusinessStore(state => state.activeBusinessId);

export const useSetActiveBusinessId = () =>
  useBusinessStore(state => state.setActiveBusinessId);

export const useResetActiveBusinessId = () =>
  useBusinessStore(state => state.resetActiveBusinessId);
