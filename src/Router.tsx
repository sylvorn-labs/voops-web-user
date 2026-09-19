import { Route, Routes } from 'react-router';
import { Suspense } from 'react';

import { lazyImport } from '@/utils/lazy-import';

const HomePage = lazyImport({
  importer: () => import('@/pages/home/Page'),
  exportName: 'HomePage',
});

export function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index={true} element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
