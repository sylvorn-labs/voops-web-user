import { Outlet } from 'react-router';

import { AuthBrandLogo } from '@/components/auth/auth-brand-logo';

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <AuthBrandLogo />
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="w-full max-w-sm sm:max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-brand-1 relative hidden lg:block" />
    </div>
  );
}
