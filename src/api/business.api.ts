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
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('businesses')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    if (params?.search) {
      query = query.ilike('name', `%${params.search}%`);
    }

    if (params?.startDate && params?.endDate) {
      const dateField = params.dateField ?? 'created_at';
      query = query
        .gte(dateField, params.startDate)
        .lte(dateField, params.endDate);
    }

    if (params?.sortBy) {
      query = query.order(params.sortBy, {
        ascending: params.sortOrder === 'asc',
      });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    query = query.range(from, to);

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
        total,
        page,
        limit,
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

    // Attempt to add user to business_members if no DB trigger does it automatically
    try {
      await supabase.from('business_members').insert({
        business_id: newBusiness.id,
        user_id: user.id,
        role: 'owner',
      });
    } catch {
      // If a trigger already added the member or policy rejects duplicate, continue
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
    const { data: updated, error } = await supabase
      .from('businesses')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: updated as Business,
      message: 'Business updated successfully',
    };
  }

  public async delete(
    id: string,
  ): Promise<ApiResponse<DeleteBusinessResponse>> {
    const { error } = await supabase
      .from('businesses')
      .update({
        deleted_at: new Date().toISOString(),
      })
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
