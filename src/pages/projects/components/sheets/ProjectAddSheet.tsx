import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import { useCreateProject } from '@/hooks/api/project.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { Input } from '@/components/ui/input/Input';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  PROJECT_FORM_DEFAULT_VALUES,
  PROJECT_STATUS_OPTIONS,
  projectFormSchema,
  type ProjectFormValues,
} from '@/pages/projects/components/schema';

export function ProjectAddSheet({ formId, prefill, onSuccess }: AddSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const createMutation = useCreateProject();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      ...PROJECT_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<ProjectFormValues>),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: ProjectFormValues) => {
    if (!activeBusinessId) return;

    createMutation.mutate(
      {
        business_id: activeBusinessId,
        name: values.name,
        status: values.status,
        start_date: values.start_date || null,
        end_date: values.end_date || null,
        is_archived: values.is_archived,
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
                    placeholder="e.g. Website Redesign, Q3 Marketing Campaign"
                    disabled={createMutation.isPending}
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
                  disabled={createMutation.isPending}
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
                      disabled={createMutation.isPending}
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
                      disabled={createMutation.isPending}
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
      </form>
    </Form>
  );
}
