import { supabase } from '@/lib/supabase';
import type {
  BusinessInvitation,
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

interface RawMemberRecord extends Record<string, unknown> {
  id?: string;
  business_id?: string;
  user_id?: string;
  role?: string;
  invited_by?: string | null;
  joined_at?: string;
  created_at?: string;
  updated_at?: string;
  user_profile?: { email?: string } | null;
  inviter_profile?: { email?: string } | null;
}

function formatMember(
  raw: RawMemberRecord,
  currentUserEmail?: string | null,
  currentUserId?: string | null,
): Member {
  const userId = String(raw.user_id || '');
  const invitedBy = raw.invited_by ? String(raw.invited_by) : null;

  let email: string;
  if (raw.user_profile?.email) {
    email = raw.user_profile.email;
  } else if (typeof raw.email === 'string' && raw.email) {
    email = raw.email;
  } else if (currentUserId && userId === currentUserId && currentUserEmail) {
    email = currentUserEmail;
  } else if (userId.includes('@')) {
    email = userId;
  } else {
    email = `user-${userId.slice(0, 8)}@workspace.com`;
  }

  let invitedByEmail: string | null = null;
  if (raw.inviter_profile?.email) {
    invitedByEmail = raw.inviter_profile.email;
  } else if (invitedBy) {
    if (currentUserId && invitedBy === currentUserId && currentUserEmail) {
      invitedByEmail = currentUserEmail;
    } else if (invitedBy.includes('@')) {
      invitedByEmail = invitedBy;
    } else {
      invitedByEmail = `admin-${invitedBy.slice(0, 8)}@workspace.com`;
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
    joined_at: String(
      raw.joined_at || raw.created_at || new Date().toISOString(),
    ),
    created_at: String(raw.created_at || new Date().toISOString()),
    updated_at: String(raw.updated_at || new Date().toISOString()),
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
      .select(
        '*, user_profile:profiles!business_members_user_id_fkey(email), inviter_profile:profiles!business_members_invited_by_fkey(email)',
        { count: 'exact' },
      )
      .eq('business_id', params.business_id);

    if (params.search && params.search.trim() !== '') {
      const q = params.search.trim();
      query = query.or(`user_id.ilike.%${q}%,role.ilike.%${q}%`);
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
      formatMember(row as RawMemberRecord, user?.email, user?.id),
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
      .select(
        '*, user_profile:profiles!business_members_user_id_fkey(email), inviter_profile:profiles!business_members_invited_by_fkey(email)',
      )
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatMember(data as RawMemberRecord, user?.email, user?.id),
    };
  }

  public async create(
    payload: CreateMemberRequest,
  ): Promise<ApiResponse<CreateMemberResponse>> {
    const cleanEmail = payload.email.trim().toLowerCase();

    // Call invite_business_member RPC function
    const { data, error } = await supabase.rpc('invite_business_member', {
      p_business_id: payload.business_id,
      p_email: cleanEmail,
      p_role: payload.role,
    });

    if (error) {
      throw new Error(error.message);
    }

    const result = data as {
      status: 'joined' | 'invited';
      member_id?: string;
      invitation_id?: string;
      token?: string;
      email?: string;
      message?: string;
    };

    return {
      success: true,
      data: {
        id: result.member_id || result.invitation_id,
        status: result.status,
        member_id: result.member_id,
        invitation_id: result.invitation_id,
        token: result.token,
        email: result.email,
        message: result.message,
      },
      message:
        result.message ||
        (result.status === 'joined'
          ? 'Member added successfully'
          : 'Invitation sent successfully'),
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
      .select(
        '*, user_profile:profiles!business_members_user_id_fkey(email), inviter_profile:profiles!business_members_invited_by_fkey(email)',
      )
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: formatMember(data as RawMemberRecord, user?.email, user?.id),
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

  public async listInvitations(
    businessId: string,
  ): Promise<ApiResponse<BusinessInvitation[]>> {
    const { data, error } = await supabase
      .from('business_invitations')
      .select(
        '*, inviter_profile:profiles!business_invitations_invited_by_fkey(email)',
      )
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const invitations: BusinessInvitation[] = (data || []).map(row => ({
      id: String(row.id),
      business_id: String(row.business_id),
      email: String(row.email),
      role: row.role as BusinessInvitation['role'],
      token: String(row.token),
      invited_by: String(row.invited_by),
      invited_by_email: row.inviter_profile?.email || null,
      status: row.status as BusinessInvitation['status'],
      expires_at: String(row.expires_at),
      created_at: String(row.created_at),
      updated_at: String(row.updated_at),
    }));

    return {
      success: true,
      data: invitations,
    };
  }

  public async revokeInvitation(
    invitationId: string,
  ): Promise<ApiResponse<{ id: string }>> {
    const { error } = await supabase
      .from('business_invitations')
      .update({
        status: 'revoked',
        updated_at: new Date().toISOString(),
      })
      .eq('id', invitationId);

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      data: { id: invitationId },
    };
  }
}

export const memberAPI = MemberAPI.getInstance();
