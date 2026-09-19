import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';

import { Changelog } from './components/Changelog';

export function ChangelogPage() {
  return (
    <div className="bg-background flex min-h-dvh w-full flex-col">
      <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <Navbar />
      </header>

      <main className="flex-1">
        <Changelog />
      </main>

      <Footer />
    </div>
  );
}
