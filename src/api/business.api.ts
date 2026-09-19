import { supabase } from '@/lib/supabase';
import type {
  Business,
  BusinessListItem,
  CreateBusinessRequest,
  CreateBusinessResponse,
  DeleteBusinessResponse,
  IBusinessAPI,
  ListBusinessesParams,
  UpdateBusinessRequest,
} from '@/types/api/business.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export class BusinessAPI implements IBusinessAPI {
  private static instance: BusinessAPI;

  private constructor() {}

  public static getInstance(): BusinessAPI {
    if (!BusinessAPI.instance) {
      BusinessAPI.instance = new BusinessAPI();
    }
    return BusinessAPI.instance;
  }

  public async list(
    params?: ListBusinessesParams,
  ): Promise<PaginatedResponse<BusinessListItem>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('businesses')
      .select('id, name, currency_code, created_at, updated_at', {
        count: 'exact',
      })
      .is('deleted_at', null);

    if (params?.search) {
      query = query.ilike('name', `%${params.search}%`);
    }

    if (params?.startDate) {
      query = query.gte('created_at', params.startDate);
    }

    if (params?.endDate) {
      query = query.lte('created_at', params.endDate);
    }

    const sortBy = params?.sortBy ?? 'created_at';
    const sortOrder = params?.sortOrder ?? 'desc';
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
        items: (data as BusinessListItem[]) || [],
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Business>> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Business,
    };
  }

  public async create(
    data: CreateBusinessRequest,
  ): Promise<ApiResponse<CreateBusinessResponse>> {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error(authError?.message || 'User is not authenticated');
    }

    // Ensure the profile exists defensively for foreign key constraints
    await supabase
      .from('profiles')
      .upsert({ id: user.id }, { onConflict: 'id' });

    const { data: newBusiness, error: insertError } = await supabase
      .from('businesses')
      .insert({
        name: data.name,
        currency_code: data.currency_code ?? 'USD',
        owner_id: user.id,
        created_by: user.id,
      })
      .select('id')
      .single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    return {
      success: true,
      data: {
        id: newBusiness.id,
      },
      message: 'Business created successfully',
    };
  }

  public async update(
    id: string,
    data: UpdateBusinessRequest,
  ): Promise<ApiResponse<Business>> {
    const updatePayload: Partial<Business> = {};

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.currency_code !== undefined)
      updatePayload.currency_code = data.currency_code;

    const { data: updatedBusiness, error } = await supabase
      .from('businesses')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: updatedBusiness as Business,
    };
  }

  public async delete(
    id: string,
  ): Promise<ApiResponse<DeleteBusinessResponse>> {
    const { error } = await supabase
      .from('businesses')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: {
        id,
      },
      message: 'Business deleted successfully',
    };
  }
}

export const businessAPI = BusinessAPI.getInstance();
