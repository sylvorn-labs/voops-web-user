export interface AboutBasicSection {
  title: string;
  content: string;
  label?: string;
}

export interface AboutImage {
  src: string;
  alt: string;
  srcDark?: string;
}

export interface AboutProps {
  id?: string;
  heading?: string;
  description?: string;
  images?: AboutImage[];
  sections?: AboutBasicSection[];
  className?: string;
}
