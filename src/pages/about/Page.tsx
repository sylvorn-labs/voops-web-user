import { Incentives } from './components/Incentives';
import { About } from './components/About';
import { Team } from './components/Team';

import { TrustStrip } from '@/components/global/TrustStrip';
import { Community } from '@/components/global/Community';
import { Gallery } from '@/components/global/Gallery';

const aboutGalleryItems = [
  {
    id: 'culture-1',
    title: 'Open Source Engineering',
    summary:
      'Engineered in public with community-first design, code reviews, and radical transparency.',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape1.jpeg',
  },
  {
    id: 'culture-2',
    title: 'Distributed Asynchronous Lab',
    summary:
      'Sylvorn Labs operates with a focus on high leverage, clean architecture, and speed.',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape2.jpeg',
  },
  {
    id: 'culture-3',
    title: 'Security & Tenant Isolation',
    summary:
      'Built around cryptographic Row-Level Security, ensuring your financial ledgers remain confidential.',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape3.jpeg',
  },
  {
    id: 'culture-4',
    title: 'Cross-Platform Community',
    summary:
      'Continuous releases across web browsers and mobile ecosystems powered by React & Flutter.',
    url: 'https://github.com/Sylvorn-Labs/voops-web-user',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape4.jpeg',
  },
];

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
