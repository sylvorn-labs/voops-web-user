import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiResponse } from '@/types/api.d';
import { PartyAPI } from '@/api/party.api';

import type {
  CreatePartyRequest,
  CreatePartyResponse,
  DeletePartyResponse,
  ListPartiesParams,
  Party,
  UpdatePartyRequest,
} from '@/types/api/party.d';

export const partyAPI = PartyAPI.getInstance();

export const partyKeys = {
  all: ['parties'] as const,
  lists: () => [...partyKeys.all, 'list'] as const,
  list: (params: ListPartiesParams) => [...partyKeys.lists(), params] as const,
  details: () => [...partyKeys.all, 'detail'] as const,
  detail: (id: string) => [...partyKeys.details(), id] as const,
};

export const listPartiesOptions = (params: ListPartiesParams) => ({
  queryKey: partyKeys.list(params),
  queryFn: () => partyAPI.list(params),
  enabled: Boolean(params.business_id),
});

export const getPartyByIdOptions = (id: string) => ({
  queryKey: partyKeys.detail(id),
  queryFn: () => partyAPI.getById(id),
  enabled: Boolean(id),
});

export function useCreateParty(): UseMutationResult<
  ApiResponse<CreatePartyResponse>,
  Error,
  CreatePartyRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePartyRequest) => partyAPI.create(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: partyKeys.all });
      toast.success(`Party "${variables.name}" created successfully.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create party.');
    },
  });
}

export function useUpdateParty(): UseMutationResult<
  ApiResponse<Party>,
  Error,
  { id: string; data: UpdatePartyRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePartyRequest }) =>
      partyAPI.update(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: partyKeys.all });
      toast.success(`Party "${data.data.name}" updated successfully.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update party.');
    },
  });
}

export function useToggleArchiveParty(): UseMutationResult<
  ApiResponse<Party>,
  Error,
  { id: string; is_archived: boolean }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_archived }: { id: string; is_archived: boolean }) =>
      partyAPI.update(id, { is_archived }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: partyKeys.all });
      toast.success(
        `Party "${data.data.name}" ${variables.is_archived ? 'archived' : 'restored'} successfully.`,
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update party status.');
    },
  });
}

export function useDeleteParty(): UseMutationResult<
  ApiResponse<DeletePartyResponse>,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => partyAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partyKeys.all });
      toast.success('Party deleted successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete party.');
    },
  });
}
