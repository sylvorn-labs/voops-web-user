import { Alert01Icon } from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { HugeiconsIcon } from '@hugeicons/react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty/Empty';

import { Button } from '@/components/ui/button/Button';

import type { GlobalAction } from './types';

export type ErrorProps = {
  icon?: IconSvgElement;
  title?: string;
  description?: string;
  primaryAction?: GlobalAction;
  secondaryAction?: GlobalAction;
};

export function Error({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}: ErrorProps) {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <HugeiconsIcon icon={icon ?? Alert01Icon} />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>{title ?? 'An error occurred'}</EmptyTitle>
        <EmptyDescription>
          {description ?? 'Please try again later.'}
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
    </Empty>
  );
}
