import { supabase } from '@/lib/supabase';
import type {
  Account,
  AccountListItem,
  CreateAccountRequest,
  CreateAccountResponse,
  DeleteAccountResponse,
  IAccountAPI,
  ListAccountsParams,
  UpdateAccountRequest,
} from '@/types/api/account.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export class AccountAPI implements IAccountAPI {
  private static instance: AccountAPI;

  private constructor() {}

  public static getInstance(): AccountAPI {
    if (!AccountAPI.instance) {
      AccountAPI.instance = new AccountAPI();
    }
    return AccountAPI.instance;
  }

  public async list(
    params: ListAccountsParams,
  ): Promise<PaginatedResponse<AccountListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('accounts')
      .select(
        'id, business_id, name, kind, opening_balance, is_archived, created_at, updated_at',
        {
          count: 'exact',
        },
      )
      .eq('business_id', params.business_id)
      .is('deleted_at', null);

    if (params.search && params.search.trim() !== '') {
      query = query.ilike('name', `%${params.search.trim()}%`);
    }

    if (params.kind) {
      query = query.eq('kind', params.kind);
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
        items: (data as AccountListItem[]) || [],
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Account>> {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Account,
    };
  }

  public async create(
    data: CreateAccountRequest,
  ): Promise<ApiResponse<CreateAccountResponse>> {
    const { data: inserted, error } = await supabase
      .from('accounts')
      .insert({
        business_id: data.business_id,
        name: data.name.trim(),
        kind: data.kind,
        opening_balance: data.opening_balance ?? 0,
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
    data: UpdateAccountRequest,
  ): Promise<ApiResponse<Account>> {
    const updatePayload: Record<string, unknown> = {};
    if (data.name !== undefined) updatePayload.name = data.name.trim();
    if (data.kind !== undefined) updatePayload.kind = data.kind;
    if (data.opening_balance !== undefined)
      updatePayload.opening_balance = data.opening_balance;
    if (data.is_archived !== undefined)
      updatePayload.is_archived = data.is_archived;

    const { data: updated, error } = await supabase
      .from('accounts')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: updated as Account,
    };
  }

  public async delete(id: string): Promise<ApiResponse<DeleteAccountResponse>> {
    const { data: deleted, error } = await supabase
      .from('accounts')
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
