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
import { useCreateAccount } from '@/hooks/api/account.hook';
import { useActiveBusinessId } from '@/stores/business/business.selectors';
import { Input } from '@/components/ui/input/Input';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  ACCOUNT_FORM_DEFAULT_VALUES,
  ACCOUNT_KIND_OPTIONS,
} from '@/pages/accounts/components/schema/account.constants';
import { accountFormSchema } from '@/pages/accounts/components/schema/account.schema';
import type { AccountFormValues } from '@/pages/accounts/components/schema/account.d';

export function AccountAddSheet({ formId, prefill, onSuccess }: AddSheetProps) {
  const activeBusinessId = useActiveBusinessId();
  const createMutation = useCreateAccount();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      ...ACCOUNT_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<AccountFormValues>),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: AccountFormValues) => {
    if (!activeBusinessId) return;

    createMutation.mutate(
      {
        business_id: activeBusinessId,
        name: values.name,
        kind: values.kind,
        opening_balance: values.opening_balance,
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
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Main Operating Account, Chase Business"
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
                  <FormLabel>Account Type</FormLabel>
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
                      disabled={createMutation.isPending}
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
      </form>
    </Form>
  );
}
