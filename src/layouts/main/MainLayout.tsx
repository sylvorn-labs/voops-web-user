import { Outlet } from 'react-router';

import { Navbar } from '@/components/global/navbar/Navbar';
import { Footer } from '@/components/global/footer/Footer';
import type { MainLayoutProps } from './main-layout.d';

export function MainLayout({ children }: MainLayoutProps = {}) {
  return (
    <div className="bg-background flex min-h-dvh w-full flex-col">
      <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <Navbar />
      </header>

      <main className="flex-1">{children ?? <Outlet />}</main>

      <Footer />
    </div>
  );
}
