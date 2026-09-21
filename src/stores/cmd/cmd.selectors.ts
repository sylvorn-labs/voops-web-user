import { useCommandPaletteStore } from './cmd.store';

export const useCmdIsOpen = () => useCommandPaletteStore(state => state.isOpen);
export const useCmdValue = () => useCommandPaletteStore(state => state.value);
export const useCmdOnValueChange = () =>
  useCommandPaletteStore(state => state.onValueChange);
export const useCmdToggle = () => useCommandPaletteStore(state => state.toggle);
export const useCmdOpen = () => useCommandPaletteStore(state => state.open);
export const useCmdClose = () => useCommandPaletteStore(state => state.close);
