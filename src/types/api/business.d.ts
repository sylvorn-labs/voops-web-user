import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type BusinessSortBy =
  'name' | 'currency_code' | 'created_at' | 'updated_at';

export interface IBusinessAPI {
  list(
    params?: ListBusinessesParams,
  ): Promise<PaginatedResponse<BusinessListItem>>;
  getById(id: string): Promise<ApiResponse<Business>>;
  create(
    data: CreateBusinessRequest,
  ): Promise<ApiResponse<CreateBusinessResponse>>;
  update(
    id: string,
    data: UpdateBusinessRequest,
  ): Promise<ApiResponse<Business>>;
  delete(id: string): Promise<ApiResponse<DeleteBusinessResponse>>;
}

export interface BusinessListItem {
  id: string;
  name: string;
  currency_code: string;
  owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role?: string;
}

export interface Business {
  id: string;
  name: string;
  currency_code: string;
  owner_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ListBusinessesParams {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  dateField?: 'created_at' | 'updated_at';
  sortBy?: BusinessSortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateBusinessRequest {
  name: string;
  currency_code?: string;
}

export interface UpdateBusinessRequest {
  name?: string;
  currency_code?: string;
}

export interface CreateBusinessResponse {
  id: string;
}

export interface DeleteBusinessResponse {
  id: string;
}
