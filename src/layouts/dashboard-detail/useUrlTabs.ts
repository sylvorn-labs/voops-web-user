import { useSearchParams } from 'react-router';
import { useCallback } from 'react';

export function useUrlTabs(values: readonly string[], defaultTab: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab =
    values.find(t => t === searchParams.get('tab')) ?? defaultTab;

  const setActiveTab = useCallback(
    (tab: string) => {
      setSearchParams({ tab }, { replace: true });
    },
    [setSearchParams],
  );

  return { activeTab, setActiveTab };
}
