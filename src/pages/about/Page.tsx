import { About } from './components/About';
import { Incentives } from './components/Incentives';
import { Team } from './components/Team';
import { Community } from '@/components/global/Community';
import { Gallery } from '@/components/global/Gallery';
import { TrustStrip } from '@/components/global/TrustStrip';
import { aboutGalleryItems } from './Page.constants';

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
