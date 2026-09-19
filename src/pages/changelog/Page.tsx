import { Changelog } from './components/changelog/Changelog';

import { Download } from '@/components/global/download/Download';
import { Community } from '@/components/global/community/Community';
import { Cta } from '@/components/global/cta/Cta';

export function ChangelogPage() {
  return (
    <>
      <Changelog />
      <Cta />
      <Download />
      <Community />
    </>
  );
}
