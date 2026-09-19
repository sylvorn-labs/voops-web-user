import { Hero } from './components/Hero';
import { Logos } from './components/Logos';
import { Testimonials } from './components/Testimonials';

import { TrustStrip } from '@/components/global/TrustStrip';
import { FeaturesMatrix } from '@/components/global/FeaturesMatrix';
import { Industries } from '@/components/global/Industries';
import { Gallery } from '@/components/global/Gallery';
import { Faq } from '@/components/global/Faq';
import { Download } from '@/components/global/Download';

export function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <TrustStrip />
      <FeaturesMatrix />
      <Industries />
      <Gallery />
      <Testimonials />
      <Faq />
      <Download />
    </>
  );
}
