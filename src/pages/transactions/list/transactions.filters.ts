import { CategoryAPI } from '@/api/category.api';
import { AccountAPI } from '@/api/account.api';
import { ProjectAPI } from '@/api/project.api';
import { PartyAPI } from '@/api/party.api';
import type { DataTableAsyncFilterableColumn } from '@/components/dashboard/data-table/types';

export const TRANSACTION_SEARCHABLE_COLUMNS = [
  { id: 'description', title: 'Description' },
];

export const TRANSACTION_FILTERABLE_COLUMNS = [
  {
    id: 'type',
    title: 'Type',
    options: [
      { label: 'Expense (Debit)', value: 'debit' },
      { label: 'Income (Credit)', value: 'credit' },
    ],
  },
  {
    id: 'is_archived',
    title: 'Archive Status',
    options: [
      { label: 'Active', value: 'false' },
      { label: 'Archived', value: 'true' },
    ],
  },
];

export function getTransactionAsyncFilterableColumns(
  businessId: string | null,
): DataTableAsyncFilterableColumn[] {
  if (!businessId) return [];

  return [
    {
      id: 'category_id',
      title: 'Category',
      searchPlaceholder: 'Search categories...',
      fetchSearchOptions: async ({ search, page, limit }) => {
        const res = await CategoryAPI.getInstance().list({
          business_id: businessId,
          search,
          page,
          limit,
        });

        return {
          options: (res.data.items || []).map(cat => ({
            label: cat.name,
            value: cat.id,
          })),
          total: res.data.total,
          hasMore: res.data.page < res.data.totalPages,
        };
      },
    },
    {
      id: 'account_id',
      title: 'Account',
      searchPlaceholder: 'Search accounts...',
      fetchSearchOptions: async ({ search, page, limit }) => {
        const res = await AccountAPI.getInstance().list({
          business_id: businessId,
          search,
          page,
          limit,
        });

        return {
          options: (res.data.items || []).map(acc => ({
            label: `${acc.name} (${acc.kind})`,
            value: acc.id,
          })),
          total: res.data.total,
          hasMore: res.data.page < res.data.totalPages,
        };
      },
    },
    {
      id: 'project_id',
      title: 'Project',
      searchPlaceholder: 'Search projects...',
      fetchSearchOptions: async ({ search, page, limit }) => {
        const res = await ProjectAPI.getInstance().list({
          business_id: businessId,
          search,
          page,
          limit,
        });

        return {
          options: (res.data.items || []).map(proj => ({
            label: proj.name,
            value: proj.id,
          })),
          total: res.data.total,
          hasMore: res.data.page < res.data.totalPages,
        };
      },
    },
    {
      id: 'party_id',
      title: 'Party',
      searchPlaceholder: 'Search parties...',
      fetchSearchOptions: async ({ search, page, limit }) => {
        const res = await PartyAPI.getInstance().list({
          business_id: businessId,
          search,
          page,
          limit,
        });

        return {
          options: (res.data.items || []).map(party => ({
            label: `${party.name} (${party.kind})`,
            value: party.id,
          })),
          total: res.data.total,
          hasMore: res.data.page < res.data.totalPages,
        };
      },
    },
  ];
}
