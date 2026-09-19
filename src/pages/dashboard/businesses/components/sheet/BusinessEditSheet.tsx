import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

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
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import {
  getBusinessByIdOptions,
  useUpdateBusiness,
} from '@/hooks/api/business.hook';
import { Input } from '@/components/ui/input/Input';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  BUSINESS_FORM_DEFAULT_VALUES,
  CURRENCY_OPTIONS,
} from './sheet.constants';
import { businessFormSchema } from './sheet.schema';
import type { BusinessFormValues } from './sheet.d';

export function BusinessEditSheet({ id, formId, onSuccess }: EditSheetProps) {
  const { data, isLoading, isError, refetch } = useQuery(
    getBusinessByIdOptions(id),
  );
  const updateMutation = useUpdateBusiness();

  const business = data?.data;

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: BUSINESS_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (business) {
      form.reset({
        name: business.name,
        currency_code: business.currency_code,
      });
    }
  }, [business, form]);

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: BusinessFormValues) => {
    updateMutation.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  if (isLoading) {
    return <SheetLoadingSkeleton rows={4} />;
  }

  if (isError || !business) {
    return (
      <SheetErrorState
        message="Failed to load business details."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 p-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Acme Corporation"
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
          name="currency_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Currency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={updateMutation.isPending}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {CURRENCY_OPTIONS.map(currency => (
                    <SelectItem key={currency.value} value={currency.value}>
                      <span className="font-mono">{currency.value}</span>
                      <span className="text-muted-foreground ml-2">
                        ({currency.symbol} - {currency.label})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
