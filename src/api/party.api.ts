import { supabase } from '@/lib/supabase';
import type {
  CreatePartyRequest,
  CreatePartyResponse,
  DeletePartyResponse,
  IPartyAPI,
  ListPartiesParams,
  Party,
  PartyListItem,
  UpdatePartyRequest,
} from '@/types/api/party.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export class PartyAPI implements IPartyAPI {
  private static instance: PartyAPI;

  private constructor() {}

  public static getInstance(): PartyAPI {
    if (!PartyAPI.instance) {
      PartyAPI.instance = new PartyAPI();
    }
    return PartyAPI.instance;
  }

  public async list(
    params: ListPartiesParams,
  ): Promise<PaginatedResponse<PartyListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('parties')
      .select('*', { count: 'exact' })
      .eq('business_id', params.business_id)
      .is('deleted_at', null);

    if (params.search && params.search.trim() !== '') {
      const q = params.search.trim();
      query = query.or(
        `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`,
      );
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
        items: (data as PartyListItem[]) || [],
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  public async getById(id: string): Promise<ApiResponse<Party>> {
    const { data, error } = await supabase
      .from('parties')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Party,
    };
  }

  public async create(
    payload: CreatePartyRequest,
  ): Promise<ApiResponse<CreatePartyResponse>> {
    const { data: inserted, error } = await supabase
      .from('parties')
      .insert({
        business_id: payload.business_id,
        name: payload.name.trim(),
        kind: payload.kind,
        email: payload.email?.trim() || null,
        phone: payload.phone?.trim() || null,
        is_archived: payload.is_archived ?? false,
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
    payload: UpdatePartyRequest,
  ): Promise<ApiResponse<Party>> {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (payload.name !== undefined) updateData.name = payload.name.trim();
    if (payload.kind !== undefined) updateData.kind = payload.kind;
    if (payload.email !== undefined)
      updateData.email = payload.email ? payload.email.trim() : null;
    if (payload.phone !== undefined)
      updateData.phone = payload.phone ? payload.phone.trim() : null;
    if (payload.is_archived !== undefined)
      updateData.is_archived = payload.is_archived;

    const { data, error } = await supabase
      .from('parties')
      .update(updateData)
      .eq('id', id)
      .is('deleted_at', null)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: data as Party,
    };
  }

  public async delete(id: string): Promise<ApiResponse<DeletePartyResponse>> {
    const { data: deleted, error } = await supabase
      .from('parties')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
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
