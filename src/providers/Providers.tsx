import { QueryClientProvider } from '@tanstack/react-query';
import { neutralTheme } from '@astryxdesign/theme-neutral';
import { BrowserRouter } from 'react-router';
import { Theme } from '@astryxdesign/core';

import { queryClient } from '@/providers/query/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme theme={neutralTheme}>{children}</Theme>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
