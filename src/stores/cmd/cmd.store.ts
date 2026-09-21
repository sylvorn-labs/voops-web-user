import { create } from 'zustand';

import type { CommandPaletteStore } from './cmd.types';

export const useCommandPaletteStore = create<CommandPaletteStore>(set => ({
  isOpen: false,
  value: '',
  onValueChange: (value: string) => set({ value }),
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  open: (value?: string) => set({ isOpen: true, value: value ?? '' }),
  close: () => set({ isOpen: false, value: '' }),
}));
