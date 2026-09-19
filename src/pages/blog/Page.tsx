import { Blog } from './components/blog/Blog';
import { Community } from '@/components/global/community/Community';
import { Download } from '@/components/global/download/Download';

export function BlogPage() {
  return (
    <>
      <Blog />
      <Download />
      <Community />
    </>
  );
}
