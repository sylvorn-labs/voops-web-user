import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type CategoryKind = 'income' | 'expense' | 'both';

export type CategorySortBy = 'name' | 'kind' | 'created_at' | 'updated_at';

export interface CategoryListItem {
  id: string;
  business_id: string;
  name: string;
  kind: CategoryKind;
  color: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Category {
  id: string;
  business_id: string;
  name: string;
  kind: CategoryKind;
  color: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ListCategoriesParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  kind?: CategoryKind;
  startDate?: string;
  endDate?: string;
  dateField?: 'created_at' | 'updated_at';
  sortBy?: CategorySortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateCategoryRequest {
  business_id: string;
  name: string;
  kind: CategoryKind;
  color?: string | null;
}

export interface UpdateCategoryRequest {
  name?: string;
  kind?: CategoryKind;
  color?: string | null;
}

export interface CreateCategoryResponse {
  id: string;
}

export interface DeleteCategoryResponse {
  id: string;
}

export interface ICategoryAPI {
  list(
    params: ListCategoriesParams,
  ): Promise<PaginatedResponse<CategoryListItem>>;
  getById(id: string): Promise<ApiResponse<Category>>;
  create(
    data: CreateCategoryRequest,
  ): Promise<ApiResponse<CreateCategoryResponse>>;
  update(
    id: string,
    data: UpdateCategoryRequest,
  ): Promise<ApiResponse<Category>>;
  delete(id: string): Promise<ApiResponse<DeleteCategoryResponse>>;
}
