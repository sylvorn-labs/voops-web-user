import { create } from 'zustand';

import type { BreadcrumbStore } from './breadcrumbs.types';

export const useBreadcrumbStore = create<BreadcrumbStore>(set => ({
  breadcrumbs: [
    {
      label: 'Dashboard',
      href: '/dashboard',
      isPage: true,
    },
  ],
  setBreadcrumbs: breadcrumbs => set({ breadcrumbs }),
}));
