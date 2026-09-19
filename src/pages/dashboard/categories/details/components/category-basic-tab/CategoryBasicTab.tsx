import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FloppyDiskIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useUpdateCategory } from '@/hooks/api/category.hook';

import { CategoryBadge } from '@/pages/dashboard/categories/components/category-badge/CategoryBadge';
import { categoryFormSchema } from '@/pages/dashboard/categories/components/sheet/sheet.schema';
import {
  CATEGORY_COLOR_PRESETS,
  CATEGORY_KIND_OPTIONS,
} from '@/pages/dashboard/categories/components/sheet/sheet.constants';
import type { CategoryFormValues } from '@/pages/dashboard/categories/components/sheet/sheet.d';
import type { CategoryBasicTabProps } from './category-basic-tab.d';

export function CategoryBasicTab({ category }: CategoryBasicTabProps) {
  const updateMutation = useUpdateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
      kind: category.kind,
      color: category.color || '',
    },
  });

  useEffect(() => {
    form.reset({
      name: category.name,
      kind: category.kind,
      color: category.color || '',
    });
  }, [category, form]);

  const onSubmit = (values: CategoryFormValues) => {
    updateMutation.mutate({
      id: category.id,
      data: {
        name: values.name,
        kind: values.kind,
        color: values.color || null,
      },
    });
  };

  const isDirty = form.formState.isDirty;

  const leftContent = (
    <DataCard
      title="Category Settings"
      description="Update category name, classification type, and accent color."
      action={
        <Button
          size="sm"
          type="submit"
          form="category-details-form"
          disabled={!isDirty || updateMutation.isPending}
        >
          <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      }
    >
      <Form {...form}>
        <form
          id="category-details-form"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Subscriptions, Travel, Equipment"
                    disabled={updateMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="kind"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY_KIND_OPTIONS.map(option => (
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accent Color</FormLabel>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-9 shrink-0 rounded-lg border shadow-xs"
                      style={{ backgroundColor: field.value || '#6366F1' }}
                    />
                    <FormControl>
                      <Input
                        placeholder="#6366F1"
                        disabled={updateMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <span className="text-muted-foreground mb-2 block text-xs font-medium">
              Preset Palette
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_COLOR_PRESETS.map(preset => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() =>
                    form.setValue('color', preset.value, { shouldDirty: true })
                  }
                  className="size-6 cursor-pointer rounded-full border border-black/10 shadow-xs transition-transform hover:scale-110 active:scale-95"
                  style={{ backgroundColor: preset.value }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>
        </form>
      </Form>
    </DataCard>
  );

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and system audit timestamps."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={category.id} label="Category ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField
            label="Workspace ID"
            value={category.business_id}
            copyable
          />
          <DataCardPropertyRow
            label="Category Type"
            value={
              <CategoryBadge kind={category.kind} color={category.color} />
            }
          />
          <DataCardPropertyRow
            label="Accent Color"
            value={
              category.color ? (
                <div className="flex items-center justify-end gap-2">
                  <span
                    className="size-3 rounded-full border shadow-xs"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-mono text-xs">{category.color}</span>
                </div>
              ) : (
                '—'
              )
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={category.created_at}
          updatedAt={category.updated_at}
          deletedAt={category.deleted_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
