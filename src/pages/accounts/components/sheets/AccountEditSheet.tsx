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
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import {
  getAccountByIdOptions,
  useUpdateAccount,
} from '@/hooks/api/account.hook';
import { Input } from '@/components/ui/input/Input';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  ACCOUNT_FORM_DEFAULT_VALUES,
  ACCOUNT_KIND_OPTIONS,
} from '@/pages/accounts/components/schema/account.constants';
import { accountFormSchema } from '@/pages/accounts/components/schema/account.schema';
import type { AccountFormValues } from '@/pages/accounts/components/schema/account.d';

export function AccountEditSheet({ id, formId, onSuccess }: EditSheetProps) {
  const { data, isLoading, isError, refetch } = useQuery(
    getAccountByIdOptions(id),
  );
  const updateMutation = useUpdateAccount();

  const account = data?.data;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: ACCOUNT_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (account) {
      form.reset({
        name: account.name,
        kind: account.kind,
        opening_balance: Number(account.opening_balance),
        is_archived: account.is_archived,
      });
    }
  }, [account, form]);

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: AccountFormValues) => {
    updateMutation.mutate(
      {
        id,
        data: {
          name: values.name,
          kind: values.kind,
          opening_balance: values.opening_balance,
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

  if (isLoading) {
    return <SheetLoadingSkeleton rows={4} />;
  }

  if (isError || !account) {
    return (
      <SheetErrorState
        message="Failed to load account details."
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
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Main Operating Account, Chase Business"
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
                  <FormLabel>Account Type</FormLabel>
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
                      {ACCOUNT_KIND_OPTIONS.map(option => (
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
                      value={field.value ?? 0}
                      onChange={e =>
                        field.onChange(
                          e.target.value === '' ? '' : Number(e.target.value),
                        )
                      }
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
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow-xs">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={updateMutation.isPending}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Archive this account
                  </FormLabel>
                  <p className="text-muted-foreground text-xs">
                    Archived accounts remain in your audit records but
                    won&apos;t appear in active transaction selectors.
                  </p>
                </div>
              </FormItem>
            )}
          />
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
