import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type TransactionType = 'debit' | 'credit';

export type TransactionSortBy =
  | 'occurred_on'
  | 'amount'
  | 'type'
  | 'description'
  | 'is_archived'
  | 'created_at'
  | 'updated_at';

export interface Transaction {
  id: string;
  business_id: string;
  type: TransactionType;
  amount: number;
  occurred_on: string;
  description: string | null;
  created_by: string;
  created_by_email?: string | null;
  paid_from_account_id: string | null;
  received_in_account_id: string | null;
  account_id?: string | null;
  account_name?: string | null;
  category_id: string | null;
  category_name?: string | null;
  category_color?: string | null;
  project_id: string | null;
  project_name?: string | null;
  from_party_id: string | null;
  to_party_id: string | null;
  party_id?: string | null;
  party_name?: string | null;
  attachment_url: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type TransactionListItem = Transaction;

export interface ListTransactionsParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  type?: TransactionType | TransactionType[];
  account_id?: string | string[];
  category_id?: string | string[];
  project_id?: string | string[];
  party_id?: string | string[];
  is_archived?: boolean;
  startDate?: string;
  endDate?: string;
  dateField?: 'occurred_on' | 'created_at' | 'updated_at';
  sortBy?: TransactionSortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateTransactionRequest {
  business_id: string;
  type: TransactionType;
  amount: number;
  occurred_on?: string;
  description?: string | null;
  account_id: string;
  category_id?: string | null;
  project_id?: string | null;
  party_id?: string | null;
  attachment_url?: string | null;
  is_archived?: boolean;
}

export interface UpdateTransactionRequest {
  type?: TransactionType;
  amount?: number;
  occurred_on?: string;
  description?: string | null;
  account_id?: string;
  category_id?: string | null;
  project_id?: string | null;
  party_id?: string | null;
  attachment_url?: string | null;
  is_archived?: boolean;
}

export interface CreateTransactionResponse {
  id: string;
}

export interface DeleteTransactionResponse {
  id: string;
}

export interface ITransactionAPI {
  list(
    params: ListTransactionsParams,
  ): Promise<PaginatedResponse<TransactionListItem>>;
  getById(id: string): Promise<ApiResponse<Transaction>>;
  create(
    data: CreateTransactionRequest,
  ): Promise<ApiResponse<CreateTransactionResponse>>;
  update(
    id: string,
    data: UpdateTransactionRequest,
  ): Promise<ApiResponse<Transaction>>;
  toggleArchive(
    id: string,
    is_archived: boolean,
  ): Promise<ApiResponse<Transaction>>;
  delete(id: string): Promise<ApiResponse<DeleteTransactionResponse>>;
}
