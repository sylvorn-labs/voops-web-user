import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
import { Textarea } from '@/components/ui/textarea/Textarea';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import { useCreateTransaction } from '@/hooks/api/transaction.hook';
import { listAccountsOptions } from '@/hooks/api/account.hook';
import { listCategoriesOptions } from '@/hooks/api/category.hook';
import { listProjectsOptions } from '@/hooks/api/project.hook';
import { listPartiesOptions } from '@/hooks/api/party.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { useSheetOpen } from '@/stores/sheet/sheet.selectors';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  TRANSACTION_FORM_DEFAULT_VALUES,
  TRANSACTION_TYPE_OPTIONS,
} from '@/pages/transactions/components/schema/transaction.constants';
import { transactionFormSchema } from '@/pages/transactions/components/schema/transaction.schema';
import type { TransactionFormValues } from '@/pages/transactions/components/schema/transaction.d';

export function TransactionAddSheet({
  formId,
  prefill,
  onSuccess,
}: AddSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const createMutation = useCreateTransaction();
  const openSheet = useSheetOpen();

  const { data: accountsData } = useQuery(
    listAccountsOptions({
      business_id: activeBusinessId || '',
      limit: 100,
      is_archived: false,
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
      is_archived: false,
    }),
  );

  const { data: partiesData } = useQuery(
    listPartiesOptions({
      business_id: activeBusinessId || '',
      limit: 100,
      is_archived: false,
    }),
  );

  const accounts = accountsData?.data?.items || [];
  const categories = categoriesData?.data?.items || [];
  const projects = projectsData?.data?.items || [];
  const parties = partiesData?.data?.items || [];

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      ...TRANSACTION_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<TransactionFormValues>),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const selectedType = useWatch({
    control: form.control,
    name: 'type',
    defaultValue: 'debit',
  });

  /**
   * Opens an add sheet for a related entity (category / project / party).
   * The current transaction draft is captured before navigating away; when
   * the child sheet succeeds, the transaction sheet is re-opened with the
   * draft restored and the newly created record pre-selected.
   */
  const handleQuickAdd = (
    field: 'category_id' | 'project_id' | 'party_id',
    sheetKey: 'category' | 'project' | 'party',
    title: string,
    description: string,
  ) => {
    const draft = form.getValues();
    const isCredit = draft.type === 'credit';

    openSheet({
      sheetKey,
      mode: 'add',
      title,
      description,
      onSuccess: result => {
        openSheet({
          sheetKey: 'transaction',
          mode: 'add',
          title: isCredit ? 'Add Credit (Income)' : 'Add Debit (Expense)',
          description: isCredit
            ? 'Record a new incoming financial transaction.'
            : 'Record a new outgoing expense transaction.',
          prefill: {
            ...draft,
            ...(result?.id ? { [field]: result.id } : {}),
          },
        });
      },
    });
  };

  const onSubmit = (values: TransactionFormValues) => {
    if (!activeBusinessId) return;

    createMutation.mutate(
      {
        business_id: activeBusinessId,
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
                    disabled={createMutation.isPending}
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
                      disabled={createMutation.isPending}
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
                      date={field.value ? new Date(field.value) : undefined}
                      onSelect={date => {
                        field.onChange(
                          date ? date.toISOString().slice(0, 10) : '',
                        );
                      }}
                      disabled={createMutation.isPending}
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
                    disabled={createMutation.isPending}
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
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Category (Optional)</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() =>
                        handleQuickAdd(
                          'category_id',
                          'category',
                          'Add Category',
                          'Create a new category to organize income and expenses.',
                        )
                      }
                      aria-label="Create new category"
                      title="Create new category"
                    >
                      <HugeiconsIcon icon={PlusSignIcon} />
                    </Button>
                  </div>
                  <Select
                    onValueChange={value =>
                      field.onChange(value === 'none' ? '' : value)
                    }
                    value={field.value || 'none'}
                    disabled={createMutation.isPending}
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
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Project (Optional)</FormLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() =>
                        handleQuickAdd(
                          'project_id',
                          'project',
                          'Add Project',
                          'Create a new project to organize tasks and finances.',
                        )
                      }
                      aria-label="Create new project"
                      title="Create new project"
                    >
                      <HugeiconsIcon icon={PlusSignIcon} />
                    </Button>
                  </div>
                  <Select
                    onValueChange={value =>
                      field.onChange(value === 'none' ? '' : value)
                    }
                    value={field.value || 'none'}
                    disabled={createMutation.isPending}
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
                <div className="flex items-center justify-between gap-2">
                  <FormLabel>
                    {selectedType === 'debit'
                      ? 'Paid To Party (Optional)'
                      : 'Received From Party (Optional)'}
                  </FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() =>
                      handleQuickAdd(
                        'party_id',
                        'party',
                        'Add Party',
                        'Create a new customer, vendor, employee, or contact.',
                      )
                    }
                    aria-label="Create new party"
                    title="Create new party"
                  >
                    <HugeiconsIcon icon={PlusSignIcon} />
                  </Button>
                </div>
                <Select
                  onValueChange={value =>
                    field.onChange(value === 'none' ? '' : value)
                  }
                  value={field.value || 'none'}
                  disabled={createMutation.isPending}
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

        <SheetFieldGroup title="Notes & Description">
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
                    disabled={createMutation.isPending}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
