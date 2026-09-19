import { PageHeader } from '@/components/dashboard/page-header/PageHeader';
import { DataTable } from '@/components/dashboard/data-table/DataTable';
import { Separator } from '@/components/ui/separator/Separator';

import type { ListingLayoutProps } from './types';

export function ListingLayout<TData, TValue>({
  header,
  dataTable,
  sidebar,
  children,
}: ListingLayoutProps<TData, TValue>) {
  const content = (
    <>
      <PageHeader {...header} />
      <Separator />
      <DataTable {...dataTable} />
      {children}
    </>
  );

  const body = sidebar ? (
    <div className="grid h-full grid-cols-1 gap-6 p-6 lg:grid-cols-10">
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">{content}</div>
      <div className="min-w-0 lg:col-span-3">{sidebar}</div>
    </div>
  ) : (
    <div className="flex h-full flex-col gap-6 p-6">{content}</div>
  );

  return body;
}
