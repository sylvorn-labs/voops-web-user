import { Changelog } from './components/changelog/Changelog';

import { Download } from '@/components/global/download/Download';
import { Community } from '@/components/global/community/Community';

export function ChangelogPage() {
  return (
    <>
      <Changelog />
      <Download />
      <Community />
    </>
  );
}
