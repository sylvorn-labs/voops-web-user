import { About } from './components/about/About';
import { Incentives } from './components/incentives/Incentives';
import { Team } from './components/team/Team';
import { Community } from '@/components/global/community/Community';
import { Gallery } from '@/components/global/gallery/Gallery';
import { TrustStrip } from '@/components/global/trust-strip/TrustStrip';
import { aboutGalleryItems } from './page.constants';

export function AboutPage() {
  return (
    <>
      <About id="about" />
      <TrustStrip />
      <Gallery
        id="lab-moments"
        heading="Behind the Scenes at Sylvorn Labs"
        demoText="Explore our GitHub Repository"
        demoUrl="https://github.com/Sylvorn-Labs/voops-web-user"
        items={aboutGalleryItems}
      />
      <Team />
      <Incentives />
      <Community />
    </>
  );
}
