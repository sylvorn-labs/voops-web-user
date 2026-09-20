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
import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useUpdateAccount } from '@/hooks/api/account.hook';

import { AccountKindBadge } from '@/pages/accounts/list/components/account-kind-badge/AccountKindBadge';
import { AccountStatusBadge } from '@/pages/accounts/list/components/account-status-badge/AccountStatusBadge';
import {
  accountFormSchema,
  ACCOUNT_KIND_OPTIONS,
  type AccountFormValues,
} from '@/pages/accounts/components/schema';
import type { AccountBasicTabProps } from './account-basic-tab.d';

export function AccountBasicTab({ account }: AccountBasicTabProps) {
  const updateMutation = useUpdateAccount();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: account.name,
      kind: account.kind,
      opening_balance: Number(account.opening_balance),
      is_archived: account.is_archived,
    },
  });

  useEffect(() => {
    form.reset({
      name: account.name,
      kind: account.kind,
      opening_balance: Number(account.opening_balance),
      is_archived: account.is_archived,
    });
  }, [account, form]);

  const onSubmit = (values: AccountFormValues) => {
    updateMutation.mutate({
      id: account.id,
      data: {
        name: values.name,
        kind: values.kind,
        opening_balance: values.opening_balance,
        is_archived: values.is_archived,
      },
    });
  };

  const isDirty = form.formState.isDirty;

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Account Settings"
        description="Update account name, type classification, and opening balance."
        action={
          <Button
            size="sm"
            type="submit"
            form="account-details-form"
            disabled={!isDirty || updateMutation.isPending}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="account-details-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
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
          </form>
        </Form>
      </DataCard>
    </div>
  );

  const formattedOpeningBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(account.opening_balance));

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and system audit timestamps."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={account.id} label="Account ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField
            label="Workspace ID"
            value={account.business_id}
            copyable
          />
          <DataCardPropertyRow
            label="Account Type"
            value={<AccountKindBadge kind={account.kind} />}
          />
          <DataCardPropertyRow
            label="Account Status"
            value={<AccountStatusBadge isArchived={account.is_archived} />}
          />
          <DataCardPropertyRow
            label="Opening Balance"
            value={
              <span className="text-foreground font-semibold">
                {formattedOpeningBalance}
              </span>
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={account.created_at}
          updatedAt={account.updated_at}
          deletedAt={account.deleted_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
