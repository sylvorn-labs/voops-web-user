import { Testimonials } from './components/Testimonials';
import { Logos } from './components/Logos';
import { Hero } from './components/Hero';

import { FeaturesMatrix } from '@/components/global/FeaturesMatrix';
import { TrustStrip } from '@/components/global/TrustStrip';
import { Industries } from '@/components/global/Industries';
import { Download } from '@/components/global/Download';
import { Gallery } from '@/components/global/Gallery';
import { Faq } from '@/components/global/Faq';

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
      <Download />
    </>
  );
}
