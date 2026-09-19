import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import type { ThemeToggleProps } from './theme-toggle.d';

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    return 'dark';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="size-4.5 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="size-4.5 transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  );
}
