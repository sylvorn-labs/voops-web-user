import type React from 'react';

export interface SpinnerProps extends React.ComponentProps<'svg'> {
  className?: string;
  strokeWidth?: number;
}
