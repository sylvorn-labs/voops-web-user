import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { LoadingFallback } from '@/components/global/loading-fallback/LoadingFallback';
import { DashboardLayout } from '@/layouts/dashboard/Layout';
import { MainLayout } from '@/layouts/main/MainLayout';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { lazyImport } from '@/utils/lazy-import';

// ─── Lazy Loaded Pages ────────────────────────────────────────────────────────

const HomePage = lazyImport({
  importer: () => import('@/pages/home/Page'),
  exportName: 'HomePage',
});

const AboutPage = lazyImport({
  importer: () => import('@/pages/about/Page'),
  exportName: 'AboutPage',
});

const FeaturesPage = lazyImport({
  importer: () => import('@/pages/features/Page'),
  exportName: 'FeaturesPage',
});

const MultiBusinessFeaturePage = lazyImport({
  importer: () => import('@/pages/features/multi-business/Page'),
  exportName: 'MultiBusinessFeaturePage',
});

const TeamCollaborationFeaturePage = lazyImport({
  importer: () => import('@/pages/features/team-collaboration/Page'),
  exportName: 'TeamCollaborationFeaturePage',
});

const AccountAnalyticsFeaturePage = lazyImport({
  importer: () => import('@/pages/features/account-analytics/Page'),
  exportName: 'AccountAnalyticsFeaturePage',
});

const CategoryOrganizationFeaturePage = lazyImport({
  importer: () => import('@/pages/features/category-organization/Page'),
  exportName: 'CategoryOrganizationFeaturePage',
});

const ProjectAnalyticsFeaturePage = lazyImport({
  importer: () => import('@/pages/features/project-analytics/Page'),
  exportName: 'ProjectAnalyticsFeaturePage',
});

const PeopleAnalyticsFeaturePage = lazyImport({
  importer: () => import('@/pages/features/people-analytics/Page'),
  exportName: 'PeopleAnalyticsFeaturePage',
});

const PricingPage = lazyImport({
  importer: () => import('@/pages/pricing/Page'),
  exportName: 'PricingPage',
});

const ContactPage = lazyImport({
  importer: () => import('@/pages/contact/Page'),
  exportName: 'ContactPage',
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

const BlogPage = lazyImport({
  importer: () => import('@/pages/blog/Page'),
  exportName: 'BlogPage',
});

const BlogPostPage = lazyImport({
  importer: () => import('@/pages/blog/slug/Page'),
  exportName: 'BlogPostPage',
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

const DashboardPage = lazyImport({
  importer: () => import('@/pages/dashboard/Page'),
  exportName: 'DashboardPage',
});

const BusinessListPage = lazyImport({
  importer: () => import('@/pages/dashboard/businesses/Page'),
  exportName: 'BusinessListPage',
});

const CategoryListPage = lazyImport({
  importer: () => import('@/pages/categories/list/Page'),
  exportName: 'CategoryListPage',
});

const CategoryDetailsPage = lazyImport({
  importer: () => import('@/pages/categories/details/Page'),
  exportName: 'CategoryDetailsPage',
});

const AccountListPage = lazyImport({
  importer: () => import('@/pages/accounts/list/Page'),
  exportName: 'AccountListPage',
});

const AccountDetailsPage = lazyImport({
  importer: () => import('@/pages/accounts/details/Page'),
  exportName: 'AccountDetailsPage',
});

const NotFoundPage = lazyImport({
  importer: () => import('@/pages/not-found/Page'),
  exportName: 'NotFoundPage',
});

const NotLoggedInPage = lazyImport({
  importer: () => import('@/pages/not-logged-in/Page'),
  exportName: 'NotLoggedInPage',
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
          <Route
            path="/features/multi-business"
            element={<MultiBusinessFeaturePage />}
          />
          <Route
            path="/features/team-collaboration"
            element={<TeamCollaborationFeaturePage />}
          />
          <Route
            path="/features/account-analytics"
            element={<AccountAnalyticsFeaturePage />}
          />
          <Route
            path="/features/category-organization"
            element={<CategoryOrganizationFeaturePage />}
          />
          <Route
            path="/features/project-analytics"
            element={<ProjectAnalyticsFeaturePage />}
          />
          <Route
            path="/features/people-analytics"
            element={<PeopleAnalyticsFeaturePage />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/not-logged-in" element={<NotLoggedInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Authentication Routes wrapped with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Dashboard Routes wrapped with DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index={true} element={<DashboardPage />} />
          <Route path="businesses" element={<BusinessListPage />} />
          <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/:id" element={<CategoryDetailsPage />} />
          <Route path="accounts" element={<AccountListPage />} />
          <Route path="accounts/:id" element={<AccountDetailsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
