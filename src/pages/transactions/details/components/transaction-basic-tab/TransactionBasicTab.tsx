import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { DatePicker } from '@/components/ui/date-picker/DatePicker';
import { useUpdateTransaction } from '@/hooks/api/transaction.hook';
import { listAccountsOptions } from '@/hooks/api/account.hook';
import { listCategoriesOptions } from '@/hooks/api/category.hook';
import { listProjectsOptions } from '@/hooks/api/project.hook';
import { listPartiesOptions } from '@/hooks/api/party.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';

import { TransactionTypeBadge } from '@/pages/transactions/list/components/transaction-type-badge/TransactionTypeBadge';
import { TransactionArchiveBadge } from '@/pages/transactions/list/components/transaction-archive-badge/TransactionArchiveBadge';
import {
  TRANSACTION_FORM_DEFAULT_VALUES,
  TRANSACTION_TYPE_OPTIONS,
} from '@/pages/transactions/components/schema/transaction.constants';
import { transactionEditFormSchema } from '@/pages/transactions/components/schema/transaction.schema';
import type { TransactionEditFormValues } from '@/pages/transactions/components/schema/transaction.d';
import type { TransactionBasicTabProps } from './transaction-basic-tab.d';

export function TransactionBasicTab({ transaction }: TransactionBasicTabProps) {
  const activeBusinessId = useActiveBusinessId();
  const updateMutation = useUpdateTransaction();

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
    defaultValues: {
      ...TRANSACTION_FORM_DEFAULT_VALUES,
      type: transaction.type,
      amount: transaction.amount,
      occurred_on: transaction.occurred_on,
      account_id: transaction.account_id || '',
      category_id: transaction.category_id || '',
      project_id: transaction.project_id || '',
      party_id: transaction.party_id || '',
      description: transaction.description || '',
      is_archived: transaction.is_archived,
    },
  });

  useEffect(() => {
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
  }, [transaction, form]);

  const selectedType = useWatch({
    control: form.control,
    name: 'type',
    defaultValue: transaction.type,
  });

  const onSubmit = (values: TransactionEditFormValues) => {
    updateMutation.mutate({
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
    });
  };

  const isDirty = form.formState.isDirty;

  const leftContent = (
    <Form {...form}>
      <form
        id="transaction-details-form"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6"
      >
        <DataCard
          title="Transaction Details"
          description="Manage transaction direction, monetary amount, date, and assigned financial account."
          action={
            <Button
              size="sm"
              type="submit"
              form="transaction-details-form"
              disabled={!isDirty || updateMutation.isPending}
            >
              <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          }
        >
          <div className="flex flex-col gap-5">
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
              <Controller
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
          </div>
        </DataCard>

        <DataCard
          title="Categorization & Associated Entities"
          description="Associate this transaction with a category, project, or external party."
        >
          <div className="flex flex-col gap-5">
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
          </div>
        </DataCard>

        <DataCard
          title="Memo & Status"
          description="Detailed transaction description, audit notes, and archive status."
        >
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description / Memo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter transaction notes or details..."
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
          </div>
        </DataCard>
      </form>
    </Form>
  );

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and system audit timestamps."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={transaction.id} label="Transaction ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField
            label="Workspace ID"
            value={transaction.business_id}
            copyable
          />
          <DataCardField
            label="Created By"
            value={transaction.created_by_email || transaction.created_by}
            copyable
          />
          <DataCardPropertyRow
            label="Monetary Amount"
            value={
              <span className="text-foreground text-sm font-semibold">
                {formattedAmount}
              </span>
            }
          />
          <DataCardPropertyRow
            label="Transaction Type"
            value={<TransactionTypeBadge type={transaction.type} />}
          />
          <DataCardPropertyRow
            label="Archive Status"
            value={
              <TransactionArchiveBadge isArchived={transaction.is_archived} />
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={transaction.created_at}
          updatedAt={transaction.updated_at}
          deletedAt={transaction.deleted_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
