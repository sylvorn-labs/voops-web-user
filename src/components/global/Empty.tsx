import { Archive04Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Empty as Emp,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty/Empty';

import { Button } from '@/components/ui/button/Button';

import type { GlobalAction } from './types';

type EmptyProps = {
  icon?: IconSvgElement;
  title?: string;
  description?: string;
  primaryAction?: GlobalAction;
  secondaryAction?: GlobalAction;
};

export function Empty({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: EmptyProps) {
  return (
    <Emp>
      <EmptyMedia variant="icon">
        <HugeiconsIcon icon={icon ?? Archive04Icon} />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>{title ?? 'No results found'}</EmptyTitle>
        <EmptyDescription>
          {description ?? "We couldn't find any results for your search."}
        </EmptyDescription>
      </EmptyHeader>
      {(primaryAction || secondaryAction) && (
        <EmptyContent>
          {primaryAction && (
            <Button
              variant={'default'}
              className="flex cursor-pointer items-center gap-2"
              onClick={primaryAction.onClick}
            >
              <HugeiconsIcon icon={primaryAction.icon} />
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={'secondary'}
              className="flex cursor-pointer items-center gap-2"
              onClick={secondaryAction.onClick}
            >
              <HugeiconsIcon icon={secondaryAction.icon} />
              {secondaryAction.label}
            </Button>
          )}
        </EmptyContent>
      )}
    </Emp>
  );
}
