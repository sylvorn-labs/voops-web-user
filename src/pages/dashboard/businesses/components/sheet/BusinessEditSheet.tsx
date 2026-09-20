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
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
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
        opening_balance: business.opening_balance ?? 0,
        current_balance: business.current_balance ?? 0,
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
        message="Could not load business details. Please check your connection."
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
        <SheetFieldGroup title="General Information">
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
        </SheetFieldGroup>

        <SheetFieldGroup title="Financial Balances">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="opening_balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opening Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      disabled={updateMutation.isPending}
                      value={field.value ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        field.onChange(val === '' ? 0 : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="current_balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Balance</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      disabled={updateMutation.isPending}
                      value={field.value ?? ''}
                      onChange={e => {
                        const val = e.target.value;
                        field.onChange(val === '' ? 0 : Number(val));
                      }}
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
