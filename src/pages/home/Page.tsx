import { Testimonials } from './components/Testimonials/Testimonials';
import { Logos } from './components/Logos/Logos';
import { Hero } from './components/Hero/Hero';

import { FeaturesMatrix } from '@/components/global/FeaturesMatrix/FeaturesMatrix';
import { TrustStrip } from '@/components/global/TrustStrip/TrustStrip';
import { Industries } from '@/components/global/Industries/Industries';
import { Download } from '@/components/global/Download/Download';
import { Gallery } from '@/components/global/Gallery/Gallery';
import { Faq } from '@/components/global/Faq/Faq';

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
