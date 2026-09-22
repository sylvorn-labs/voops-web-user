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

function formatBusiness(raw: Record<string, unknown>): Business {
  return {
    id: String(raw.id),
    name: String(raw.name),
    currency_code: String(raw.currency_code || 'INR'),
    opening_balance: Number(raw.opening_balance || 0),
    current_balance: Number(raw.current_balance || 0),
    owner_id: String(raw.owner_id),
    created_by: String(raw.created_by),
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
    deleted_at: raw.deleted_at ? String(raw.deleted_at) : null,
  };
}

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
      .select(
        'id, name, currency_code, opening_balance, current_balance, owner_id, created_by, created_at, updated_at',
        {
          count: 'exact',
        },
      )
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
    const items = (data || []).map(row =>
      formatBusiness(row as Record<string, unknown>),
    );

    return {
      success: true,
      data: {
        items,
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
      data: formatBusiness(data as Record<string, unknown>),
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
      .upsert({ id: user.id, email: user.email }, { onConflict: 'id' });

    const openingBalance = data.opening_balance ?? 0;
    const currentBalance = data.current_balance ?? openingBalance;

    const { data: newBusiness, error: insertError } = await supabase
      .from('businesses')
      .insert({
        name: data.name,
        currency_code: data.currency_code ?? 'INR',
        opening_balance: openingBalance,
        current_balance: currentBalance,
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
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.currency_code !== undefined)
      updatePayload.currency_code = data.currency_code;
    if (data.opening_balance !== undefined)
      updatePayload.opening_balance = data.opening_balance;
    if (data.current_balance !== undefined)
      updatePayload.current_balance = data.current_balance;

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
      data: formatBusiness(updatedBusiness as Record<string, unknown>),
    };
  }

  public async delete(
    id: string,
    hard = false,
  ): Promise<ApiResponse<DeleteBusinessResponse>> {
    if (hard) {
      return this.hardDelete(id);
    }

    const { error } = await supabase
      .from('businesses')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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

  public async hardDelete(
    id: string,
  ): Promise<ApiResponse<DeleteBusinessResponse>> {
    const { error } = await supabase.from('businesses').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: {
        id,
      },
      message: 'Business permanently deleted successfully',
    };
  }

  public async restore(id: string): Promise<ApiResponse<Business>> {
    const { data, error } = await supabase
      .from('businesses')
      .update({
        deleted_at: null,
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
      data: formatBusiness(data as Record<string, unknown>),
      message: 'Business restored successfully',
    };
  }
}

export const businessAPI = BusinessAPI.getInstance();
