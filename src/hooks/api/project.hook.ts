import { queryOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryClient } from '@/providers/query/query-client';
import type {
  CreateProjectRequest,
  ListProjectsParams,
  UpdateProjectRequest,
} from '@/types/api/project.d';
import { ProjectAPI } from '@/api/project.api';

export const projectAPI = ProjectAPI.getInstance();

export const projectQueryKeys = {
  all: ['projects'] as const,
  list: (params?: ListProjectsParams) =>
    [...projectQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...projectQueryKeys.all, 'detail', id] as const,
};

export function listProjectsOptions(params: ListProjectsParams) {
  return queryOptions({
    queryKey: projectQueryKeys.list(params),
    queryFn: () => projectAPI.list(params),
    enabled: Boolean(params.business_id),
    staleTime: 1000 * 60 * 5,
  });
}

export function getProjectByIdOptions(id: string) {
  return queryOptions({
    queryKey: projectQueryKeys.detail(id),
    queryFn: () => projectAPI.getById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateProject() {
  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...projectQueryKeys.all, 'list'],
      });
      toast.success('Project created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create project');
    },
  });
}

export function useUpdateProject() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      projectAPI.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...projectQueryKeys.all, 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(variables.id),
      });
      toast.success('Project updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
}

export function useToggleArchiveProject() {
  return useMutation({
    mutationFn: ({ id, is_archived }: { id: string; is_archived: boolean }) =>
      projectAPI.update(id, { is_archived }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...projectQueryKeys.all, 'list'],
      });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(variables.id),
      });
      toast.success(
        variables.is_archived
          ? 'Project archived successfully!'
          : 'Project restored successfully!',
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update project status');
    },
  });
}

export function useDeleteProject() {
  return useMutation({
    mutationFn: (id: string) => projectAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...projectQueryKeys.all, 'list'],
      });
      toast.success('Project deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
}
