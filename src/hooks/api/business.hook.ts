import { queryOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryClient } from '@/providers/query/query-client';
import type {
  CreateBusinessRequest,
  ListBusinessesParams,
  UpdateBusinessRequest,
} from '@/types/api/business.d';
import { businessAPI } from '@/api/business.api';

export const businessQueryKeys = {
  all: ['businesses'] as const,
  list: (params?: ListBusinessesParams) =>
    [...businessQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...businessQueryKeys.all, 'detail', id] as const,
};

export function listBusinessesOptions(params?: ListBusinessesParams) {
  return queryOptions({
    queryKey: businessQueryKeys.list(params),
    queryFn: () => businessAPI.list(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function getBusinessByIdOptions(id: string) {
  return queryOptions({
    queryKey: businessQueryKeys.detail(id),
    queryFn: () => businessAPI.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateBusiness() {
  return useMutation({
    mutationFn: (data: CreateBusinessRequest) => businessAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...businessQueryKeys.all, 'list'],
      });
      toast.success('Business created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create business');
    },
  });
}

export function useUpdateBusiness() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusinessRequest }) =>
      businessAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...businessQueryKeys.all, 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: businessQueryKeys.detail(variables.id),
      });
      toast.success('Business updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update business');
    },
  });
}

export function useDeleteBusiness() {
  return useMutation({
    mutationFn: (id: string) => businessAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...businessQueryKeys.all, 'list'],
      });
      toast.success('Business deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete business');
    },
  });
}
