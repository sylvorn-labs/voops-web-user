import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { FloppyDiskIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { DateRange } from 'react-day-picker';

import { SplitLayout } from '@/components/dashboard/SpiltLayout';
import { DataCard } from '@/components/dashboard/data-card/DataCard';
import { DataCardField } from '@/components/dashboard/data-card/DataCardField';
import { DataCardIdField } from '@/components/dashboard/data-card/DataCardIdField';
import {
  DataCardPropertyRow,
  DataCardTimestampGroup,
} from '@/components/dashboard/data-card/DataCardPropertyRow';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { DateRangePicker } from '@/components/ui/date-picker/DateRangePicker';
import { formatDateOnly, parseDateOnly } from '@/lib/date';
import { useUpdateProject } from '@/hooks/api/project.hook';

import { ProjectStatusBadge } from '@/pages/projects/list/components/project-status-badge/ProjectStatusBadge';
import { ProjectArchiveBadge } from '@/pages/projects/list/components/project-archive-badge/ProjectArchiveBadge';
import {
  PROJECT_FORM_DEFAULT_VALUES,
  PROJECT_STATUS_OPTIONS,
} from '@/pages/projects/components/schema/project.constants';
import { projectFormSchema } from '@/pages/projects/components/schema/project.schema';
import type { ProjectFormValues } from '@/pages/projects/components/schema/project.d';
import type { ProjectBasicTabProps } from './project-basic-tab.d';

export function ProjectBasicTab({ project }: ProjectBasicTabProps) {
  const updateMutation = useUpdateProject();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      ...PROJECT_FORM_DEFAULT_VALUES,
      name: project.name,
      status: project.status,
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      is_archived: project.is_archived,
    },
  });

  useEffect(() => {
    form.reset({
      name: project.name,
      status: project.status,
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      is_archived: project.is_archived,
    });
  }, [project, form]);

  const onSubmit = (values: ProjectFormValues) => {
    updateMutation.mutate({
      id: project.id,
      data: {
        name: values.name,
        status: values.status,
        start_date: values.start_date || null,
        end_date: values.end_date || null,
        is_archived: values.is_archived,
      },
    });
  };

  const isDirty = form.formState.isDirty;

  const [startDateStr, endDateStr] = useWatch({
    control: form.control,
    name: ['start_date', 'end_date'],
  });

  const dateRangeValue: DateRange | undefined = {
    from: startDateStr ? parseDateOnly(startDateStr) : undefined,
    to: endDateStr ? parseDateOnly(endDateStr) : undefined,
  };

  const handleDateRangeChange = (range?: DateRange) => {
    const fromStr = range?.from ? formatDateOnly(range.from) : '';
    const toStr = range?.to ? formatDateOnly(range.to) : '';
    form.setValue('start_date', fromStr, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue('end_date', toStr, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Project Settings"
        description="Update project name, timeline, and current execution status."
        action={
          <Button
            size="sm"
            type="submit"
            form="project-details-form"
            disabled={!isDirty || updateMutation.isPending}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="project-details-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Website Redesign"
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
                      Archive this project
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">
                      Archived projects remain in records but are hidden from
                      active transaction selectors.
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DataCard>
    </div>
  );

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and system audit timestamps."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={project.id} label="Project ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField
            label="Workspace ID"
            value={project.business_id}
            copyable
          />
          <DataCardPropertyRow
            label="Project Status"
            value={<ProjectStatusBadge status={project.status} />}
          />
          <DataCardPropertyRow
            label="Archive Status"
            value={<ProjectArchiveBadge isArchived={project.is_archived} />}
          />
          <DataCardPropertyRow
            label="Start Date"
            value={
              <span className="text-foreground text-sm font-medium">
                {project.start_date || 'Not set'}
              </span>
            }
          />
          <DataCardPropertyRow
            label="End Date"
            value={
              <span className="text-foreground text-sm font-medium">
                {project.end_date || 'Not set'}
              </span>
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={project.created_at}
          updatedAt={project.updated_at}
          deletedAt={project.deleted_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
