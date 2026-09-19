import { Testimonials } from './components/testimonials/Testimonials';
import { Logos } from './components/logos/Logos';
import { Hero } from './components/hero/Hero';

import { FeaturesMatrix } from '@/components/global/features-matrix/FeaturesMatrix';
import { TrustStrip } from '@/components/global/trust-strip/TrustStrip';
import { Industries } from '@/components/global/industries/Industries';
import { Download } from '@/components/global/download/Download';
import { Gallery } from '@/components/global/gallery/Gallery';
import { Faq } from '@/components/global/faq/Faq';
import { Cta } from '@/components/global/cta/Cta';

export function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <FeaturesMatrix />
      <TrustStrip />
      <Industries />
      <Gallery />
      <Testimonials />
      <Faq />
      <Cta />
      <Download />
    </>
  );
}
