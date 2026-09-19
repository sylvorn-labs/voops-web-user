export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  features?: string[];
  buttonText?: string;
  buttonUrl?: string;
}

export interface PricingProps {
  id?: string;
  heading?: string;
  description?: string;
  plan?: PricingPlan;
  featureGroups?: string[][];
  className?: string;
}
