import { Changelog } from './components/Changelog/Changelog';

import { Download } from '@/components/global/Download/Download';
import { Community } from '@/components/global/Community/Community';

export function ChangelogPage() {
  return (
    <>
      <Changelog />
      <Download />
      <Community />
    </>
  );
}
