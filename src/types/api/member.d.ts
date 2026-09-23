import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type MemberRole = 'owner' | 'admin' | 'member' | 'viewer';
export type InvitationStatus = 'pending' | 'accepted' | 'revoked' | 'expired';

export interface Member {
  id: string;
  business_id: string;
  user_id: string;
  email: string;
  role: MemberRole;
  invited_by: string | null;
  invited_by_email: string | null;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export type MemberListItem = Member;

export interface BusinessInvitation {
  id: string;
  business_id: string;
  email: string;
  role: MemberRole;
  token: string;
  invited_by: string;
  invited_by_email?: string | null;
  status: InvitationStatus;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export type MemberSortBy =
  'email' | 'role' | 'joined_at' | 'created_at' | 'updated_at';

export interface ListMembersParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  role?: MemberRole;
  sortBy?: MemberSortBy;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  dateField?: 'joined_at' | 'created_at' | 'updated_at';
}

export interface CreateMemberRequest {
  business_id: string;
  email: string;
  role: MemberRole;
  invited_by?: string | null;
  user_id?: string;
}

export interface UpdateMemberRequest {
  role?: MemberRole;
}

export interface CreateMemberResponse {
  id?: string;
  status?: 'joined' | 'invited';
  member_id?: string;
  invitation_id?: string;
  token?: string;
  email?: string;
  message?: string;
}

export interface DeleteMemberResponse {
  id: string;
}

export interface IMemberAPI {
  list(params: ListMembersParams): Promise<PaginatedResponse<MemberListItem>>;
  getById(id: string): Promise<ApiResponse<Member>>;
  create(
    payload: CreateMemberRequest,
  ): Promise<ApiResponse<CreateMemberResponse>>;
  update(
    id: string,
    payload: UpdateMemberRequest,
  ): Promise<ApiResponse<Member>>;
  delete(id: string): Promise<ApiResponse<DeleteMemberResponse>>;
  listInvitations(
    businessId: string,
  ): Promise<ApiResponse<BusinessInvitation[]>>;
  revokeInvitation(invitationId: string): Promise<ApiResponse<{ id: string }>>;
}
