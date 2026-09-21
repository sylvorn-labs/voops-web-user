import type { IconSvgElement } from '@hugeicons/react';

import type { PermissionCode } from '@/constants/permissions.constant';

import { useCommands } from './cmd.constant';

export type CommandGroup = {
  heading: string;
  items: Command[];
};

type Command = {
  icon: IconSvgElement;
  label: string;
  permission?: PermissionCode[];
  onSelect: () => void;
};

export type CommandType = ReturnType<
  typeof useCommands
>[number]['items'][number];

export type CommandReturnType = ReturnType<typeof useCommands>;
