import { supabase } from '@/lib/supabase';
import type {
  CreateMemberRequest,
  CreateMemberResponse,
  DeleteMemberResponse,
  IMemberAPI,
  ListMembersParams,
  Member,
  MemberListItem,
  UpdateMemberRequest,
} from '@/types/api/member.d';
import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

function formatMember(
  raw: Record<string, unknown>,
  currentUserEmail?: string | null,
  currentUserId?: string | null,
): Member {
  const userId = String(raw.user_id || '');
  const invitedBy = raw.invited_by ? String(raw.invited_by) : null;

  let email = typeof raw.email === 'string' ? raw.email : '';
  if (!email) {
    if (userId.includes('@')) {
      email = userId;
    } else if (currentUserId && userId === currentUserId && currentUserEmail) {
      email = currentUserEmail;
    } else {
      email = `member-${userId.slice(0, 8)}@example.com`;
    }
  }

  let invitedByEmail: string | null = null;
  if (invitedBy) {
    if (invitedBy.includes('@')) {
      invitedByEmail = invitedBy;
    } else if (
      currentUserId &&
      invitedBy === currentUserId &&
      currentUserEmail
    ) {
      invitedByEmail = currentUserEmail;
    } else {
      invitedByEmail = `admin-${invitedBy.slice(0, 8)}@example.com`;
    }
  }

  return {
    id: String(raw.id),
    business_id: String(raw.business_id),
    user_id: userId,
    email,
    role: raw.role as Member['role'],
    invited_by: invitedBy,
    invited_by_email: invitedByEmail,
    joined_at: String(raw.joined_at),
    created_at: String(raw.created_at),
    updated_at: String(raw.updated_at),
  };
}

export class MemberAPI implements IMemberAPI {
  private static instance: MemberAPI;

  private constructor() {}

  public static getInstance(): MemberAPI {
    if (!MemberAPI.instance) {
      MemberAPI.instance = new MemberAPI();
    }
    return MemberAPI.instance;
  }

  public async list(
    params: ListMembersParams,
  ): Promise<PaginatedResponse<MemberListItem>> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let query = supabase
      .from('business_members')
      .select('*', { count: 'exact' })
      .eq('business_id', params.business_id);

    if (params.search && params.search.trim() !== '') {
      const q = params.search.trim();
      query = query.ilike('user_id', `%${q}%`);
    }

    if (params.role) {
      query = query.eq('role', params.role);
    }

    const dateField = params.dateField ?? 'joined_at';
    if (params.startDate) {
      query = query.gte(dateField, params.startDate);
    }

    if (params.endDate) {
      query = query.lte(dateField, params.endDate);
    }

    const sortBy =
      params.sortBy === 'email' ? 'joined_at' : (params.sortBy ?? 'joined_at');
    const sortOrder = params.sortOrder ?? 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    query = query.range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit);
    const items = (data || []).map(row =>
      formatMember(row, user?.email, user?.id),
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

  public async getById(id: string): Promise<ApiResponse<Member>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('business_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatMember(data, user?.email, user?.id),
    };
  }

  public async create(
    payload: CreateMemberRequest,
  ): Promise<ApiResponse<CreateMemberResponse>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = payload.user_id?.trim() || crypto.randomUUID();

    // Ensure profile row exists for foreign key integrity
    await supabase
      .from('profiles')
      .upsert({ id: userId }, { onConflict: 'id' });

    const { data: inserted, error } = await supabase
      .from('business_members')
      .insert({
        business_id: payload.business_id,
        user_id: userId,
        role: payload.role,
        invited_by: user?.id || payload.invited_by || null,
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
    payload: UpdateMemberRequest,
  ): Promise<ApiResponse<Member>> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (payload.role !== undefined) updateData.role = payload.role;

    const { data, error } = await supabase
      .from('business_members')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatMember(data, user?.email, user?.id),
    };
  }

  public async delete(id: string): Promise<ApiResponse<DeleteMemberResponse>> {
    const { error } = await supabase
      .from('business_members')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id },
    };
  }
}
