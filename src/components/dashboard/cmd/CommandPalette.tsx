import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useRef } from 'react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command/Command';
import {
  useCmdIsOpen,
  useCmdOnValueChange,
  useCmdToggle,
  useCmdValue,
} from '@/stores/cmd/cmd.selectors';

import { useSheetIsOpen } from '@/stores/sheet/sheet.selectors';

import { useCommands } from './cmd.constant';

export function CommandPalette() {
  const inputRef = useRef<HTMLInputElement>(null);
  const onValueChange = useCmdOnValueChange();
  const sheetIsOpen = useSheetIsOpen();
  const COMMANDS = useCommands();
  const isOpen = useCmdIsOpen();
  const toggle = useCmdToggle();
  const value = useCmdValue();

  // Focus input when command palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Focus command palette when sheet closes
  useEffect(() => {
    if (!sheetIsOpen && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [sheetIsOpen, isOpen]);

  const handleSelect = (onSelect: () => void) => {
    onSelect();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={toggle}>
      <Command>
        <CommandInput
          ref={inputRef}
          value={value}
          onValueChange={onValueChange}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {COMMANDS.map(group => (
            <div key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map(command => (
                  <CommandItem
                    key={command.label}
                    onSelect={() => handleSelect(command.onSelect)}
                  >
                    <HugeiconsIcon icon={command.icon} />
                    <span>{command.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
