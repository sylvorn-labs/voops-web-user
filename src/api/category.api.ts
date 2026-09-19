import { supabase } from '@/lib/supabase';
import type {
  Category,
  CategoryListItem,
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  ICategoryAPI,
  ListCategoriesParams,
  UpdateCategoryRequest,
} from '@/types/api/category.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export class CategoryAPI implements ICategoryAPI {
  private static instance: CategoryAPI;

  private constructor() {}

  public static getInstance(): CategoryAPI {
    if (!CategoryAPI.instance) {
      CategoryAPI.instance = new CategoryAPI();
    }
    return CategoryAPI.instance;
  }

  public async list(
    params: ListCategoriesParams,
  ): Promise<PaginatedResponse<CategoryListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('categories')
      .select('id, business_id, name, kind, color, created_at, updated_at', {
        count: 'exact',
      })
      .eq('business_id', params.business_id)
      .is('deleted_at', null);

    if (params.search && params.search.trim() !== '') {
      query = query.ilike('name', `%${params.search.trim()}%`);
    }

    if (params.kind) {
      query = query.eq('kind', params.kind);
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
        items: (data as CategoryListItem[]) || [],
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Category>> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Category,
    };
  }

  public async create(
    data: CreateCategoryRequest,
  ): Promise<ApiResponse<CreateCategoryResponse>> {
    const { data: inserted, error } = await supabase
      .from('categories')
      .insert({
        business_id: data.business_id,
        name: data.name.trim(),
        kind: data.kind,
        color: data.color || null,
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
    data: UpdateCategoryRequest,
  ): Promise<ApiResponse<Category>> {
    const updatePayload: Record<string, unknown> = {};
    if (data.name !== undefined) updatePayload.name = data.name.trim();
    if (data.kind !== undefined) updatePayload.kind = data.kind;
    if (data.color !== undefined) updatePayload.color = data.color || null;

    const { data: updated, error } = await supabase
      .from('categories')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: updated as Category,
    };
  }

  public async delete(
    id: string,
  ): Promise<ApiResponse<DeleteCategoryResponse>> {
    const { data: deleted, error } = await supabase
      .from('categories')
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
