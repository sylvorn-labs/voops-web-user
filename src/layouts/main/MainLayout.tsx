import { Outlet } from 'react-router';

import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';

export function MainLayout() {
  return (
    <div className="bg-background flex min-h-dvh w-full flex-col">
      <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
