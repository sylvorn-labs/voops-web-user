export type BusinessState = {
  activeBusinessId: string | null;
};

export type BusinessActions = {
  setActiveBusinessId: (businessId: string | null) => void;
  resetActiveBusinessId: () => void;
};

export type BusinessStore = BusinessState & BusinessActions;
