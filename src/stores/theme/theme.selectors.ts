import { useThemeStore } from './theme.store';

export const useTheme = () => useThemeStore(state => state.theme);
export const useSetTheme = () => useThemeStore(state => state.setTheme);
export const useToggleTheme = () => useThemeStore(state => state.toggleTheme);
