import { create } from 'zustand';
import type { Theme, ThemeStore } from './theme.d';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'dark';
}

function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

export const useThemeStore = create<ThemeStore>((set, get) => {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  return {
    theme: initialTheme,
    setTheme: (theme: Theme) => {
      applyTheme(theme);
      set({ theme });
    },
    toggleTheme: () => {
      const current = get().theme;
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      set({ theme: next });
    },
  };
});
