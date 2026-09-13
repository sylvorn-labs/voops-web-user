import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

import { vendorGroups } from './vendor-groups.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;

          for (const [name, packages] of Object.entries(vendorGroups)) {
            if (packages.some(pkg => id.includes(`node_modules/${pkg}/`))) {
              return name;
            }
          }

          return undefined;
        },
      },
    },
  },
});
