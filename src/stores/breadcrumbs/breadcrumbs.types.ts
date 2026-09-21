export type BreadcrumbItemType = {
  label: string;
  href?: string;
  isPage?: boolean;
  className?: string;
};

export type BreadcrumbState = {
  breadcrumbs: BreadcrumbItemType[];
};

export type BreadcrumbActions = {
  setBreadcrumbs: (breadcrumbs: BreadcrumbItemType[]) => void;
};

export type BreadcrumbStore = BreadcrumbState & BreadcrumbActions;
