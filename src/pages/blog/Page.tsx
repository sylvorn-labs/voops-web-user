import { Blog } from './components/blog/Blog';
import { Community } from '@/components/global/community/Community';
import { Download } from '@/components/global/download/Download';
import { Cta } from '@/components/global/cta/Cta';

export function BlogPage() {
  return (
    <>
      <Blog />
      <Cta />
      <Download />
      <Community />
    </>
  );
}
