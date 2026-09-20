import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type AccountKind = 'cash' | 'bank' | 'card' | 'wallet' | 'other';

export type AccountSortBy =
  | 'name'
  | 'kind'
  | 'opening_balance'
  | 'is_archived'
  | 'created_at'
  | 'updated_at';

export interface AccountListItem {
  id: string;
  business_id: string;
  name: string;
  kind: AccountKind;
  opening_balance: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Account {
  id: string;
  business_id: string;
  name: string;
  kind: AccountKind;
  opening_balance: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ListAccountsParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  kind?: AccountKind;
  is_archived?: boolean;
  startDate?: string;
  endDate?: string;
  dateField?: 'created_at' | 'updated_at';
  sortBy?: AccountSortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateAccountRequest {
  business_id: string;
  name: string;
  kind: AccountKind;
  opening_balance?: number;
  is_archived?: boolean;
}

export interface UpdateAccountRequest {
  name?: string;
  kind?: AccountKind;
  opening_balance?: number;
  is_archived?: boolean;
}

export interface CreateAccountResponse {
  id: string;
}

export interface DeleteAccountResponse {
  id: string;
}

export interface IAccountAPI {
  list(params: ListAccountsParams): Promise<PaginatedResponse<AccountListItem>>;
  getById(id: string): Promise<ApiResponse<Account>>;
  create(
    data: CreateAccountRequest,
  ): Promise<ApiResponse<CreateAccountResponse>>;
  update(id: string, data: UpdateAccountRequest): Promise<ApiResponse<Account>>;
  delete(id: string): Promise<ApiResponse<DeleteAccountResponse>>;
}
