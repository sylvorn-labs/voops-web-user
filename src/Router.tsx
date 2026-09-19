import { Route, Routes } from 'react-router';
import { Suspense } from 'react';

import { lazyImport } from '@/utils/lazy-import';
import { AuthLayout } from '@/layouts/auth/AuthLayout';

const HomePage = lazyImport({
  importer: () => import('@/pages/home/Page'),
  exportName: 'HomePage',
});

const TermsPage = lazyImport({
  importer: () => import('@/pages/terms/Page'),
  exportName: 'TermsPage',
});

const PrivacyPage = lazyImport({
  importer: () => import('@/pages/privacy/Page'),
  exportName: 'PrivacyPage',
});

const RoadmapPage = lazyImport({
  importer: () => import('@/pages/roadmap/Page'),
  exportName: 'RoadmapPage',
});

const RegisterPage = lazyImport({
  importer: () => import('@/pages/register/Page'),
  exportName: 'RegisterPage',
});

const VerifyPage = lazyImport({
  importer: () => import('@/pages/verify/Page'),
  exportName: 'VerifyPage',
});

const LoginPage = lazyImport({
  importer: () => import('@/pages/login/Page'),
  exportName: 'LoginPage',
});

const ForgotPasswordPage = lazyImport({
  importer: () => import('@/pages/forgot-password/Page'),
  exportName: 'ForgotPasswordPage',
});

const ResetPasswordPage = lazyImport({
  importer: () => import('@/pages/reset-password/Page'),
  exportName: 'ResetPasswordPage',
});

function LoadingFallback() {
  return (
    <div className="bg-background text-muted-foreground flex h-dvh w-dvw items-center justify-center text-sm">
      <div className="flex items-center gap-2">
        <div className="border-primary size-4 animate-spin rounded-full border-2 border-t-transparent" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index={true} element={<HomePage />} />

        {/* Informational / Legal & Resource Routes */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

        {/* Authentication Routes wrapped with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
