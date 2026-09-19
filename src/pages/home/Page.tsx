import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';
import { Hero } from './components/hero';

export function HomePage() {
  return (
    <div className="bg-background flex min-h-dvh w-full flex-col">
      <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <Navbar />
      </header>

      <main className="flex-1">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}
