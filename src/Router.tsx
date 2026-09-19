import { Route, Routes } from 'react-router';
import { Suspense } from 'react';

import { lazyImport } from '@/utils/lazy-import';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { MainLayout } from '@/layouts/main/MainLayout';
import { LoadingFallback } from '@/components/global/LoadingFallback';

const HomePage = lazyImport({
  importer: () => import('@/pages/home/Page'),
  exportName: 'HomePage',
});

const AboutPage = lazyImport({
  importer: () => import('@/pages/about/Page'),
  exportName: 'AboutPage',
});

const ContactPage = lazyImport({
  importer: () => import('@/pages/contact/Page'),
  exportName: 'ContactPage',
});

const FeaturesPage = lazyImport({
  importer: () => import('@/pages/features/Page'),
  exportName: 'FeaturesPage',
});

const PricingPage = lazyImport({
  importer: () => import('@/pages/pricing/Page'),
  exportName: 'PricingPage',
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

const HelpPage = lazyImport({
  importer: () => import('@/pages/help/Page'),
  exportName: 'HelpPage',
});

const ChangelogPage = lazyImport({
  importer: () => import('@/pages/changelog/Page'),
  exportName: 'ChangelogPage',
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

export function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Main Layout routes (Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>

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
