import { FeaturesMatrix } from './components/FeaturesMatrix';
import { Testimonials } from './components/Testimonials';
import { TrustStrip } from './components/TrustStrip';
import { Industries } from './components/Industries';
import { Download } from './components/Download';
import { Gallery } from './components/Gallery';
import { Logos } from './components/Logos';
import { Hero } from './components/Hero';
import { Faq } from './components/Faq';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturesMatrix />
      <Logos />
      <Industries />
      <Gallery />
      <Testimonials />
      <Faq />
      <Download />
    </>
  );
}
