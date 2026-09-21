import { tinykeys } from 'tinykeys';
import { useEffect } from 'react';

import { useCmdToggle } from '@/stores/cmd/cmd.selectors';

export function KeyboardShortcuts() {
  const toggle = useCmdToggle();

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      '$mod+k': event => {
        event.preventDefault();
        toggle();
      },
    });

    return () => unsubscribe();
  });

  return null;
}
