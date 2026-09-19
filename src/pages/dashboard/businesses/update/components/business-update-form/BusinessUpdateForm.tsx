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
import { useUpdateBusiness } from '@/hooks/api/business.hook';
import { businessUpdateSchema } from './business-update-form.schema';
import { CURRENCY_OPTIONS } from './business-update-form.constants';
import type {
  BusinessUpdateFormProps,
  BusinessUpdateFormValues,
} from './business-update-form.d';

export function BusinessUpdateForm({
  business,
  onSuccess,
}: BusinessUpdateFormProps) {
  const navigate = useNavigate();
  const updateBusiness = useUpdateBusiness();

  const form = useForm<BusinessUpdateFormValues>({
    resolver: zodResolver(businessUpdateSchema),
    defaultValues: {
      name: business.name,
      currency_code: business.currency_code || 'USD',
    },
  });

  const onSubmit = (values: BusinessUpdateFormValues) => {
    updateBusiness.mutate(
      {
        id: business.id,
        data: values,
      },
      {
        onSuccess: () => {
          onSuccess?.();
          navigate('/dashboard/businesses');
        },
      },
    );
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
          <Button type="submit" disabled={updateBusiness.isPending}>
            {updateBusiness.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
