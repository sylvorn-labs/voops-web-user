import type { ApiResponse, PaginatedResponse } from '@/types/api.d';

export type PartyKind = 'customer' | 'vendor' | 'employee' | 'other';

export interface Party {
  id: string;
  business_id: string;
  name: string;
  kind: PartyKind;
  email: string | null;
  phone: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type PartyListItem = Party;

export type PartySortBy =
  | 'name'
  | 'kind'
  | 'email'
  | 'phone'
  | 'is_archived'
  | 'created_at'
  | 'updated_at';

export interface ListPartiesParams {
  business_id: string;
  page?: number;
  limit?: number;
  search?: string;
  kind?: PartyKind;
  is_archived?: boolean;
  sortBy?: PartySortBy;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  dateField?: 'created_at' | 'updated_at';
}

export interface CreatePartyRequest {
  business_id: string;
  name: string;
  kind: PartyKind;
  email?: string | null;
  phone?: string | null;
  is_archived?: boolean;
}

export interface UpdatePartyRequest {
  name?: string;
  kind?: PartyKind;
  email?: string | null;
  phone?: string | null;
  is_archived?: boolean;
}

export interface CreatePartyResponse {
  id: string;
}

export interface DeletePartyResponse {
  id: string;
}

export interface IPartyAPI {
  list(params: ListPartiesParams): Promise<PaginatedResponse<PartyListItem>>;
  getById(id: string): Promise<ApiResponse<Party>>;
  create(
    payload: CreatePartyRequest,
  ): Promise<ApiResponse<CreatePartyResponse>>;
  update(id: string, payload: UpdatePartyRequest): Promise<ApiResponse<Party>>;
  delete(id: string): Promise<ApiResponse<DeletePartyResponse>>;
}
