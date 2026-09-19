import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { useCreateBusiness } from '@/hooks/api/business.hook';
import { useSetActiveBusinessId } from '@/stores/business/business.selectors';
import { businessCreateSchema } from './business-create-form.schema';
import {
  BUSINESS_CREATE_DEFAULT_VALUES,
  CURRENCY_OPTIONS,
} from './business-create-form.constants';
import type {
  BusinessCreateFormProps,
  BusinessCreateFormValues,
} from './business-create-form.d';

export function BusinessCreateForm({ onSuccess }: BusinessCreateFormProps) {
  const navigate = useNavigate();
  const createBusiness = useCreateBusiness();
  const setActiveBusinessId = useSetActiveBusinessId();

  const form = useForm<BusinessCreateFormValues>({
    resolver: zodResolver(businessCreateSchema),
    defaultValues: BUSINESS_CREATE_DEFAULT_VALUES,
  });

  const onSubmit = (values: BusinessCreateFormValues) => {
    createBusiness.mutate(values, {
      onSuccess: res => {
        if (res.data?.id) {
          setActiveBusinessId(res.data.id);
          onSuccess?.(res.data.id);
        }
        navigate('/dashboard/businesses');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Acme Corp or Studio Design"
                  autoFocus
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
              <FormLabel>Operating Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select business currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCY_OPTIONS.map(currency => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard/businesses')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createBusiness.isPending}>
            {createBusiness.isPending ? 'Creating...' : 'Create Business'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
