import { queryOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryClient } from '@/providers/query/query-client';
import type {
  CreateCategoryRequest,
  ListCategoriesParams,
  UpdateCategoryRequest,
} from '@/types/api/category.d';
import { CategoryAPI } from '@/api/category.api';

export const categoryAPI = CategoryAPI.getInstance();

export const categoryQueryKeys = {
  all: ['categories'] as const,
  list: (params?: ListCategoriesParams) =>
    [...categoryQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...categoryQueryKeys.all, 'detail', id] as const,
};

export function listCategoriesOptions(params: ListCategoriesParams) {
  return queryOptions({
    queryKey: categoryQueryKeys.list(params),
    queryFn: () => categoryAPI.list(params),
    enabled: Boolean(params.business_id),
    staleTime: 1000 * 60 * 5,
  });
}

export function getCategoryByIdOptions(id: string) {
  return queryOptions({
    queryKey: categoryQueryKeys.detail(id),
    queryFn: () => categoryAPI.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCategory() {
  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...categoryQueryKeys.all, 'list'],
      });
      toast.success('Category created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
}

export function useUpdateCategory() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
      categoryAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...categoryQueryKeys.all, 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.detail(variables.id),
      });
      toast.success('Category updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: (id: string) => categoryAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...categoryQueryKeys.all, 'list'],
      });
      toast.success('Category deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
}
