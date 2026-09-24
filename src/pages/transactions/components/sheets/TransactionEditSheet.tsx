import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

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
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { formatDateOnly, parseDateOnly } from '@/lib/date';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import {
  getTransactionByIdOptions,
  useUpdateTransaction,
} from '@/hooks/api/transaction.hook';
import { listAccountsOptions } from '@/hooks/api/account.hook';
import { listCategoriesOptions } from '@/hooks/api/category.hook';
import { listProjectsOptions } from '@/hooks/api/project.hook';
import { listPartiesOptions } from '@/hooks/api/party.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  TRANSACTION_FORM_DEFAULT_VALUES,
  TRANSACTION_TYPE_OPTIONS,
} from '@/pages/transactions/components/schema/transaction.constants';
import { transactionEditFormSchema } from '@/pages/transactions/components/schema/transaction.schema';
import type { TransactionEditFormValues } from '@/pages/transactions/components/schema/transaction.d';

export function TransactionEditSheet({
  id,
  formId,
  onSuccess,
}: EditSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const updateMutation = useUpdateTransaction();

  const {
    data: transactionData,
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    refetch,
  } = useQuery(getTransactionByIdOptions(id || ''));

  const transaction = transactionData?.data;

  const { data: accountsData } = useQuery(
    listAccountsOptions({
      business_id: activeBusinessId || '',
      limit: 100,
    }),
  );

  const { data: categoriesData } = useQuery(
    listCategoriesOptions({
      business_id: activeBusinessId || '',
      limit: 100,
    }),
  );

  const { data: projectsData } = useQuery(
    listProjectsOptions({
      business_id: activeBusinessId || '',
      limit: 100,
    }),
  );

  const { data: partiesData } = useQuery(
    listPartiesOptions({
      business_id: activeBusinessId || '',
      limit: 100,
    }),
  );

  const accounts = accountsData?.data?.items || [];
  const categories = categoriesData?.data?.items || [];
  const projects = projectsData?.data?.items || [];
  const parties = partiesData?.data?.items || [];

  const form = useForm<TransactionEditFormValues>({
    resolver: zodResolver(transactionEditFormSchema),
    defaultValues: TRANSACTION_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (transaction) {
      form.reset({
        type: transaction.type,
        amount: transaction.amount,
        occurred_on: transaction.occurred_on,
        account_id: transaction.account_id || '',
        category_id: transaction.category_id || '',
        project_id: transaction.project_id || '',
        party_id: transaction.party_id || '',
        description: transaction.description || '',
        is_archived: transaction.is_archived,
      });
    }
  }, [transaction, form]);

  useSheetDirty(form.formState.isDirty);

  const selectedType = useWatch({
    control: form.control,
    name: 'type',
    defaultValue: 'debit',
  });

  if (isLoadingTransaction) {
    return <SheetLoadingSkeleton />;
  }

  if (isErrorTransaction || !transaction) {
    return (
      <SheetErrorState
        message="Failed to load transaction details. It may have been deleted."
        onRetry={() => void refetch()}
      />
    );
  }

  const onSubmit = (values: TransactionEditFormValues) => {
    updateMutation.mutate(
      {
        id: transaction.id,
        data: {
          type: values.type,
          amount: Number(values.amount),
          occurred_on: values.occurred_on,
          account_id: values.account_id,
          category_id: values.category_id || null,
          project_id: values.project_id || null,
          party_id: values.party_id || null,
          description: values.description || null,
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
        <SheetFieldGroup title="Transaction Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
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
                      {TRANSACTION_TYPE_OPTIONS.map(option => (
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      disabled={updateMutation.isPending}
                      value={field.value === 0 ? '' : field.value}
                      onChange={e =>
                        field.onChange(
                          e.target.value === '' ? 0 : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="occurred_on"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={
                        field.value ? parseDateOnly(field.value) : undefined
                      }
                      onSelect={date => {
                        field.onChange(date ? formatDateOnly(date) : '');
                      }}
                      disabled={updateMutation.isPending}
                      placeholder="Pick transaction date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="account_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {selectedType === 'debit'
                      ? 'Paid From Account'
                      : 'Received In Account'}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} ({acc.kind})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </SheetFieldGroup>

        <SheetFieldGroup title="Categorization & Relations">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category (Optional)</FormLabel>
                  <Select
                    onValueChange={value =>
                      field.onChange(value === 'none' ? '' : value)
                    }
                    value={field.value || 'none'}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
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
              name="project_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project (Optional)</FormLabel>
                  <Select
                    onValueChange={value =>
                      field.onChange(value === 'none' ? '' : value)
                    }
                    value={field.value || 'none'}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {projects.map(proj => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="party_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {selectedType === 'debit'
                    ? 'Paid To Party (Optional)'
                    : 'Received From Party (Optional)'}
                </FormLabel>
                <Select
                  onValueChange={value =>
                    field.onChange(value === 'none' ? '' : value)
                  }
                  value={field.value || 'none'}
                  disabled={updateMutation.isPending}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select party" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {parties.map(party => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.name} ({party.kind})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </SheetFieldGroup>

        <SheetFieldGroup title="Notes & Status">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description / Memo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter transaction memo or description..."
                    className="min-h-[90px] resize-none"
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
                    Archive this transaction
                  </FormLabel>
                  <p className="text-muted-foreground text-xs">
                    Archived transactions remain recorded in financial ledgers
                    but are hidden from active filters.
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
