import { useSheetStore } from './sheet.store';

export const useSheetOpen = () => useSheetStore(state => state.open);
export const useSheetClose = () => useSheetStore(state => state.close);
export const useSheetIsOpen = () => useSheetStore(state => state.isOpen);
export const useSheetIsDirty = () => useSheetStore(state => state._isDirty);
export const useSheetSetDirty = () => useSheetStore(state => state.setDirty);
