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
import { About } from './components/About';
import { Team } from './components/Team';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Community } from './components/Community';
import { Download } from './components/Download';

export function HomePage() {
  return (
    <>
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
      <About />
      <Team />
      <Faq />
      <Contact />
      <Community />
      <Download />
    </>
  );
}
