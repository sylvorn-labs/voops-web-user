import { Navbar } from '@/components/global/Navbar';
import { Footer } from '@/components/global/Footer';

import { Hero } from './components/Hero';
import { Logos } from './components/Logos';
import { TrustStrip } from './components/TrustStrip';
import { FeaturesMatrix } from './components/FeaturesMatrix';
import { Industries } from './components/Industries';
import { FeatureCardsGrid } from './components/FeatureCardsGrid';
import { Incentives } from './components/Incentives';
import { Gallery } from './components/Gallery';
import { Compliance } from './components/Compliance';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Team } from './components/Team';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Download } from './components/Download';

export function HomePage() {
  return (
    <div className="bg-background flex min-h-dvh w-full flex-col">
      <header className="border-border/40 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
        <Navbar />
      </header>

      <main className="flex-1">
        <Hero />
        <Logos />
        <TrustStrip />
        <FeaturesMatrix />
        <Industries />
        <FeatureCardsGrid />
        <Incentives />
        <Gallery />
        <Compliance />
        <Testimonials />
        <Pricing />
        <Team />
        <Faq />
        <Contact />
        <Download />
      </main>

      <Footer />
    </div>
  );
}
