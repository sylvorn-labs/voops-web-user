import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

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
import { DateRangePicker } from '@/components/ui/date-picker/DateRangePicker';
import {
  getProjectByIdOptions,
  useUpdateProject,
} from '@/hooks/api/project.hook';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  PROJECT_FORM_DEFAULT_VALUES,
  PROJECT_STATUS_OPTIONS,
} from '@/pages/projects/components/schema/project.constants';
import { projectFormSchema } from '@/pages/projects/components/schema/project.schema';
import type { ProjectFormValues } from '@/pages/projects/components/schema/project.d';

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

  const [startDateStr, endDateStr] = useWatch({
    control: form.control,
    name: ['start_date', 'end_date'],
  });

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
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

  const dateRangeValue: DateRange | undefined = {
    from: startDateStr ? new Date(`${startDateStr}T00:00:00`) : undefined,
    to: endDateStr ? new Date(`${endDateStr}T00:00:00`) : undefined,
  };

  const handleDateRangeChange = (range?: DateRange) => {
    const fromStr = range?.from ? format(range.from, 'yyyy-MM-dd') : '';
    const toStr = range?.to ? format(range.to, 'yyyy-MM-dd') : '';
    form.setValue('start_date', fromStr, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue('end_date', toStr, {
      shouldDirty: true,
      shouldValidate: true,
    });
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
          <FormItem>
            <FormLabel>Project Duration</FormLabel>
            <FormControl>
              <DateRangePicker
                value={dateRangeValue}
                onValueChange={handleDateRangeChange}
                disabled={updateMutation.isPending}
                placeholder="Select project start and end dates"
              />
            </FormControl>
            <FormMessage>
              {form.formState.errors.start_date?.message ||
                form.formState.errors.end_date?.message}
            </FormMessage>
          </FormItem>
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
