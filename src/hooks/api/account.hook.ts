import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import type {
  CreateAccountRequest,
  ListAccountsParams,
  UpdateAccountRequest,
} from '@/types/api/account.d';
import { AccountAPI } from '@/api/account.api';

export const accountAPI = AccountAPI.getInstance();

export const accountQueryKeys = {
  all: ['accounts'] as const,
  list: (params?: ListAccountsParams) =>
    [...accountQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...accountQueryKeys.all, 'detail', id] as const,
};

export function listAccountsOptions(params: ListAccountsParams) {
  return queryOptions({
    queryKey: accountQueryKeys.list(params),
    queryFn: () => accountAPI.list(params),
    enabled: Boolean(params.business_id),
    staleTime: 1000 * 60 * 5,
  });
}

export function getAccountByIdOptions(id: string) {
  return queryOptions({
    queryKey: accountQueryKeys.detail(id),
    queryFn: () => accountAPI.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountRequest) => accountAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.all,
      });
      toast.success('Account created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create account');
    },
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAccountRequest }) =>
      accountAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.all,
      });
      toast.success('Account updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update account');
    },
  });
}

export function useToggleArchiveAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_archived }: { id: string; is_archived: boolean }) =>
      accountAPI.update(id, { is_archived }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.all,
      });
      toast.success(
        variables.is_archived
          ? 'Account archived successfully!'
          : 'Account restored successfully!',
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update account status');
    },
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => accountAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.all,
      });
      toast.success('Account deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete account');
    },
  });
}
