import { About } from '@/pages/home/components/About';
import { Gallery } from '@/pages/home/components/Gallery';
import { Incentives } from '@/pages/home/components/Incentives';
import { TrustStrip } from '@/pages/home/components/TrustStrip';
import { Team } from '@/pages/home/components/Team';
import { Community } from '@/pages/home/components/Community';

const aboutGalleryItems = [
  {
    id: 'culture-1',
    title: 'Open Source Engineering',
    summary:
      'Engineered in public with community-first design, code reviews, and radical transparency.',
    url: 'https://github.com/sylvorn-labs',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape1.jpeg',
  },
  {
    id: 'culture-2',
    title: 'Distributed Asynchronous Lab',
    summary:
      'Sylvorn Labs operates across multiple timezones with focus on high leverage and speed.',
    url: 'https://github.com/sylvorn-labs',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape2.jpeg',
  },
  {
    id: 'culture-3',
    title: 'Security & Tenant Isolation',
    summary:
      'Built around cryptographic Row-Level Security, ensuring your financial ledgers remain confidential.',
    url: 'https://github.com/sylvorn-labs',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape3.jpeg',
  },
  {
    id: 'culture-4',
    title: 'Cross-Platform Community',
    summary:
      'Continuous releases across web browsers and mobile ecosystems powered by Flutter.',
    url: 'https://github.com/sylvorn-labs',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/landscape4.jpeg',
  },
];

export function AboutPage() {
  return (
    <>
      <About id="about" />
      <TrustStrip />
      <Incentives />
      <Gallery
        id="lab-moments"
        heading="Behind the Scenes at Sylvorn Labs"
        demoText="Explore our GitHub Collective"
        demoUrl="https://github.com/sylvorn-labs"
        items={aboutGalleryItems}
      />
      <Team />
      <Community />
    </>
  );
}
