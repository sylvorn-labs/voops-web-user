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
import { useCreateCategory } from '@/hooks/api/category.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { Input } from '@/components/ui/input/Input';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  CATEGORY_COLOR_PRESETS,
  CATEGORY_FORM_DEFAULT_VALUES,
  CATEGORY_KIND_OPTIONS,
  categoryFormSchema,
  type CategoryFormValues,
} from '@/pages/categories/components/schema';

export function CategoryAddSheet({
  formId,
  prefill,
  onSuccess,
}: AddSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const createMutation = useCreateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      ...CATEGORY_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<CategoryFormValues>),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: CategoryFormValues) => {
    if (!activeBusinessId) return;

    createMutation.mutate(
      {
        business_id: activeBusinessId,
        name: values.name,
        kind: values.kind,
        color: values.color || null,
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
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Office Supplies, Travel, Consulting"
                    disabled={createMutation.isPending}
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
                    disabled={createMutation.isPending}
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
                  <FormLabel>Color</FormLabel>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-9 shrink-0 rounded-lg border shadow-xs"
                      style={{ backgroundColor: field.value || '#6366F1' }}
                    />
                    <FormControl>
                      <Input
                        placeholder="#6366F1"
                        disabled={createMutation.isPending}
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
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
