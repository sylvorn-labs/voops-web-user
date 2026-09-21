import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'archived';

export type ProjectSortBy =
  | 'name'
  | 'status'
  | 'start_date'
  | 'end_date'
  | 'is_archived'
  | 'created_at'
  | 'updated_at';

export interface ProjectListItem {
  id: string;
  business_id: string;
  name: string;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Project {
  id: string;
  business_id: string;
  name: string;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ListProjectsParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
  is_archived?: boolean;
  startDate?: string;
  endDate?: string;
  dateField?: 'created_at' | 'updated_at' | 'start_date' | 'end_date';
  sortBy?: ProjectSortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface CreateProjectRequest {
  business_id: string;
  name: string;
  status?: ProjectStatus;
  start_date?: string | null;
  end_date?: string | null;
  is_archived?: boolean;
}

export interface UpdateProjectRequest {
  name?: string;
  status?: ProjectStatus;
  start_date?: string | null;
  end_date?: string | null;
  is_archived?: boolean;
}

export interface CreateProjectResponse {
  id: string;
}

export interface DeleteProjectResponse {
  id: string;
}

export interface IProjectAPI {
  list(params: ListProjectsParams): Promise<PaginatedResponse<ProjectListItem>>;
  getById(id: string): Promise<ApiResponse<Project>>;
  create(
    data: CreateProjectRequest,
  ): Promise<ApiResponse<CreateProjectResponse>>;
  update(id: string, data: UpdateProjectRequest): Promise<ApiResponse<Project>>;
  delete(id: string): Promise<ApiResponse<DeleteProjectResponse>>;
}
