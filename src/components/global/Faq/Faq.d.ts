export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FaqProps {
  id?: string;
  heading?: string;
  description?: string;
  items?: FaqItem[];
  className?: string;
}
