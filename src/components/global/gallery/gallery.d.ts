export interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export interface GalleryProps {
  id?: string;
  heading?: string;
  demoUrl?: string;
  demoText?: string;
  items?: GalleryItem[];
  className?: string;
}
