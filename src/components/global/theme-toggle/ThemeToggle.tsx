import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button/Button';
import { useTheme, useToggleTheme } from '@/stores/theme/theme.selectors';
import type { ThemeToggleProps } from './theme-toggle.d';

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

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
