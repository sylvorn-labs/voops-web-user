import { supabase } from '@/lib/supabase';
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectResponse,
  IProjectAPI,
  ListProjectsParams,
  Project,
  ProjectListItem,
  UpdateProjectRequest,
} from '@/types/api/project.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export class ProjectAPI implements IProjectAPI {
  private static instance: ProjectAPI;

  private constructor() {}

  public static getInstance(): ProjectAPI {
    if (!ProjectAPI.instance) {
      ProjectAPI.instance = new ProjectAPI();
    }
    return ProjectAPI.instance;
  }

  public async list(
    params: ListProjectsParams,
  ): Promise<PaginatedResponse<ProjectListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('projects')
      .select(
        'id, business_id, name, status, start_date, end_date, is_archived, created_at, updated_at',
        {
          count: 'exact',
        },
      )
      .eq('business_id', params.business_id)
      .is('deleted_at', null);

    if (params.search && params.search.trim() !== '') {
      query = query.ilike('name', `%${params.search.trim()}%`);
    }

    if (params.status) {
      query = query.eq('status', params.status);
    }

    if (params.is_archived !== undefined) {
      query = query.eq('is_archived', params.is_archived);
    }

    const dateField = params.dateField ?? 'created_at';
    if (params.startDate) {
      query = query.gte(dateField, params.startDate);
    }

    if (params.endDate) {
      query = query.lte(dateField, params.endDate);
    }

    const sortBy = params.sortBy ?? 'created_at';
    const sortOrder = params.sortOrder ?? 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        items: (data as ProjectListItem[]) || [],
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Project>> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Project,
    };
  }

  public async create(
    data: CreateProjectRequest,
  ): Promise<ApiResponse<CreateProjectResponse>> {
    const { data: inserted, error } = await supabase
      .from('projects')
      .insert({
        business_id: data.business_id,
        name: data.name.trim(),
        status: data.status ?? 'active',
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        is_archived: data.is_archived ?? false,
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id: inserted.id },
    };
  }

  public async update(
    id: string,
    data: UpdateProjectRequest,
  ): Promise<ApiResponse<Project>> {
    const updatePayload: Record<string, unknown> = {};
    if (data.name !== undefined) updatePayload.name = data.name.trim();
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.start_date !== undefined)
      updatePayload.start_date = data.start_date || null;
    if (data.end_date !== undefined)
      updatePayload.end_date = data.end_date || null;
    if (data.is_archived !== undefined)
      updatePayload.is_archived = data.is_archived;

    const { data: updated, error } = await supabase
      .from('projects')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: updated as Project,
    };
  }

  public async delete(id: string): Promise<ApiResponse<DeleteProjectResponse>> {
    const { data: deleted, error } = await supabase
      .from('projects')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id: deleted.id },
    };
  }
}
