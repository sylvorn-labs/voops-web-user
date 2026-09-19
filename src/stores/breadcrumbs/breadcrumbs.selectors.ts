import { useBreadcrumbStore } from './breadcrumbs.store';

export const useBreadcrumbs = () =>
  useBreadcrumbStore(state => state.breadcrumbs);

export const useSetBreadcrumbs = () =>
  useBreadcrumbStore(state => state.setBreadcrumbs);
