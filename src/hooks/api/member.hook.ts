import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { MemberAPI } from '@/api/member.api';
import type { ApiResponse } from '@/types/api.d';
import type {
  CreateMemberRequest,
  CreateMemberResponse,
  DeleteMemberResponse,
  ListMembersParams,
  Member,
  UpdateMemberRequest,
} from '@/types/api/member.d';

export const memberKeys = {
  all: ['members'] as const,
  lists: () => [...memberKeys.all, 'list'] as const,
  list: (params: ListMembersParams) => [...memberKeys.lists(), params] as const,
  details: () => [...memberKeys.all, 'detail'] as const,
  detail: (id: string) => [...memberKeys.details(), id] as const,
};

export const listMembersOptions = (params: ListMembersParams) => ({
  queryKey: memberKeys.list(params),
  queryFn: () => MemberAPI.getInstance().list(params),
  enabled: Boolean(params.business_id),
});

export const getMemberByIdOptions = (id: string) => ({
  queryKey: memberKeys.detail(id),
  queryFn: () => MemberAPI.getInstance().getById(id),
  enabled: Boolean(id),
});

export function useCreateMember(): UseMutationResult<
  ApiResponse<CreateMemberResponse>,
  Error,
  CreateMemberRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMemberRequest) =>
      MemberAPI.getInstance().create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all });
      toast.success('Member invited successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add member.');
    },
  });
}

export function useUpdateMember(): UseMutationResult<
  ApiResponse<Member>,
  Error,
  { id: string; data: UpdateMemberRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMemberRequest }) =>
      MemberAPI.getInstance().update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all });
      toast.success('Member role updated successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update member role.');
    },
  });
}

export function useDeleteMember(): UseMutationResult<
  ApiResponse<DeleteMemberResponse>,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MemberAPI.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all });
      toast.success('Member removed successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to remove member.');
    },
  });
}
