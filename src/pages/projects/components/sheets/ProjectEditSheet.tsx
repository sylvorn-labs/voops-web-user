import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import {
  getProjectByIdOptions,
  useUpdateProject,
} from '@/hooks/api/project.hook';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  PROJECT_FORM_DEFAULT_VALUES,
  PROJECT_STATUS_OPTIONS,
  projectFormSchema,
  type ProjectFormValues,
} from '@/pages/projects/components/schema';

export function ProjectEditSheet({ id, formId, onSuccess }: EditSheetProps) {
  const updateMutation = useUpdateProject();

  const {
    data: projectResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(getProjectByIdOptions(id));

  const project = projectResponse?.data;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        status: project.status,
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        is_archived: project.is_archived,
      });
    }
  }, [project, form]);

  useSheetDirty(form.formState.isDirty);

  if (isLoading) {
    return <SheetLoadingSkeleton />;
  }

  if (isError || !project) {
    return (
      <SheetErrorState
        message={error?.message || 'Failed to load project details'}
        onRetry={() => void refetch()}
      />
    );
  }

  const onSubmit = (values: ProjectFormValues) => {
    updateMutation.mutate(
      {
        id,
        data: {
          name: values.name,
          status: values.status,
          start_date: values.start_date || null,
          end_date: values.end_date || null,
          is_archived: values.is_archived,
        },
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 p-6"
      >
        <SheetFieldGroup title="General Information">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project name"
                    disabled={updateMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={updateMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_STATUS_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </SheetFieldGroup>

        <SheetFieldGroup title="Timeline">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={updateMutation.isPending}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={updateMutation.isPending}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SheetFieldGroup>

        <SheetFieldGroup title="Status & Visibility">
          <FormField
            control={form.control}
            name="is_archived"
            render={({ field }) => (
              <FormItem className="border-border/60 bg-muted/20 flex flex-row items-start space-y-0 space-x-3 rounded-xl border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={updateMutation.isPending}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Archive Project
                  </FormLabel>
                  <FormDescription>
                    Archived projects remain in records but are hidden from
                    active dropdowns.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
