export interface FeatureItem {
  title: string;
  description: string;
  image: string;
  imageDark?: string;
}

export interface FeaturesMatrixProps {
  id?: string;
  title?: string;
  description?: string;
  feature1?: FeatureItem;
  feature2?: FeatureItem;
  feature3?: FeatureItem;
  feature4?: FeatureItem;
  className?: string;
}
