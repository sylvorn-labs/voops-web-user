import { Outlet } from 'react-router';

import { AuthBrandLogo } from '@/components/auth/auth-brand-logo/auth-brand-logo';
import type { AuthLayoutProps } from './AuthLayout.d';

export function AuthLayout({ children }: AuthLayoutProps = {}) {
  return (
    <div className="grid h-dvh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <AuthBrandLogo />
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-sm sm:max-w-md">
            {children ?? <Outlet />}
          </div>
        </div>
      </div>
      <div className="bg-brand-1 relative hidden overflow-hidden lg:block">
        <img
          src="/images/login/login.png"
          alt="Authentication illustration"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
