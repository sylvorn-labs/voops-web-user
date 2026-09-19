import type { ReactNode } from 'react';

type SplitLayoutProps = {
  left: ReactNode;
  right: ReactNode;
};

export function SplitLayout({ left, right }: SplitLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">{left}</div>
      <div className="lg:col-span-4">{right}</div>
    </div>
  );
}
