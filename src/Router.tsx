import { Route, Routes } from 'react-router';
import { Suspense } from 'react';

import { lazyImport } from '@/utils/lazy-import';

const HomePage = lazyImport({
  importer: () => import('@/pages/home/Page'),
  exportName: 'HomePage',
});

const RegisterPage = lazyImport({
  importer: () => import('@/pages/register/Page'),
  exportName: 'RegisterPage',
});

export function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index={true} element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
}
