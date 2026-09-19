import type { ReactNode } from 'react';

import type { PageHeaderProps } from '@/components/dashboard/page-header/page-header.d';
import type { DataTableProps } from '@/components/dashboard/data-table/DataTable';

export interface ListingLayoutProps<TData, TValue> {
  header: PageHeaderProps;
  dataTable: DataTableProps<TData, TValue>;
  sidebar?: ReactNode;
  children?: ReactNode;
}
