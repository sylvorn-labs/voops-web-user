import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { TransactionAPI } from '@/api/transaction.api';
import type { ApiResponse } from '@/types/api.d';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  ListTransactionsParams,
  Transaction,
  UpdateTransactionRequest,
} from '@/types/api/transaction.d';

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (params: ListTransactionsParams) =>
    [...transactionKeys.lists(), params] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

export const listTransactionsOptions = (params: ListTransactionsParams) => ({
  queryKey: transactionKeys.list(params),
  queryFn: () => TransactionAPI.getInstance().list(params),
  enabled: Boolean(params.business_id),
});

export const getTransactionByIdOptions = (id: string) => ({
  queryKey: transactionKeys.detail(id),
  queryFn: () => TransactionAPI.getInstance().getById(id),
  enabled: Boolean(id),
});

export function useCreateTransaction(): UseMutationResult<
  ApiResponse<CreateTransactionResponse>,
  Error,
  CreateTransactionRequest
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionRequest) =>
      TransactionAPI.getInstance().create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Transaction created successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create transaction.');
    },
  });
}

export function useUpdateTransaction(): UseMutationResult<
  ApiResponse<Transaction>,
  Error,
  { id: string; data: UpdateTransactionRequest }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionRequest;
    }) => TransactionAPI.getInstance().update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Transaction updated successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update transaction.');
    },
  });
}

export function useToggleArchiveTransaction(): UseMutationResult<
  ApiResponse<Transaction>,
  Error,
  { id: string; is_archived: boolean }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_archived }: { id: string; is_archived: boolean }) =>
      TransactionAPI.getInstance().toggleArchive(id, is_archived),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success(
        `Transaction ${variables.is_archived ? 'archived' : 'restored'} successfully.`,
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update transaction status.');
    },
  });
}

export function useDeleteTransaction(): UseMutationResult<
  ApiResponse<DeleteTransactionResponse>,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TransactionAPI.getInstance().delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('Transaction deleted successfully.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete transaction.');
    },
  });
}
