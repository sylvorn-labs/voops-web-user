export type CommandPaletteState = {
  isOpen: boolean;
  value: string;
};

export type CommandPaletteAction = {
  onValueChange: (value: string) => void;
  toggle: () => void;
  open: (value?: string) => void;
  close: () => void;
};

export type CommandPaletteStore = CommandPaletteState & CommandPaletteAction;
