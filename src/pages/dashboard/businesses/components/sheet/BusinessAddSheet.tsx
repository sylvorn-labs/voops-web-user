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
import { useSetActiveBusinessId } from '@/stores/business/business.selectors';
import { useCreateBusiness } from '@/hooks/api/business.hook';
import { Input } from '@/components/ui/input/Input';
import type { AddSheetProps } from '@/types/sheet.d';

import {
  BUSINESS_FORM_DEFAULT_VALUES,
  CURRENCY_OPTIONS,
} from './sheet.constants';
import { businessFormSchema } from './sheet.schema';
import type { BusinessFormValues } from './sheet.d';

export function BusinessAddSheet({
  formId,
  prefill,
  onSuccess,
}: AddSheetProps) {
  const setActiveBusinessId = useSetActiveBusinessId();
  const createMutation = useCreateBusiness();

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      ...BUSINESS_FORM_DEFAULT_VALUES,
      ...(prefill as Partial<BusinessFormValues> | undefined),
    },
  });

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: BusinessFormValues) => {
    createMutation.mutate(values, {
      onSuccess: res => {
        if (res.data?.id) {
          setActiveBusinessId(res.data.id);
        }
        onSuccess?.();
      },
    });
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
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Acme Corporation"
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
              name="currency_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={createMutation.isPending}
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
