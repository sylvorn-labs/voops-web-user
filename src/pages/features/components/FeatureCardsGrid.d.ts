export interface FeatureCardListItem {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    srcDark?: string;
  };
  href?: string;
  label?: string;
}

export interface FeatureCardsGridProps {
  id?: string;
  heading?: string;
  description?: string;
  primaryAction?: {
    text: string;
    url: string;
    isExternal?: boolean;
  };
  features?: FeatureCardListItem[];
  className?: string;
}
