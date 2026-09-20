import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox/Checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import { getPartyByIdOptions, useUpdateParty } from '@/hooks/api/party.hook';
import type { EditSheetProps } from '@/types/sheet.d';

import {
  PARTY_FORM_DEFAULT_VALUES,
  PARTY_KIND_OPTIONS,
} from '@/pages/parties/components/schema/party.constants';
import { partyFormSchema } from '@/pages/parties/components/schema/party.schema';
import type { PartyFormValues } from '@/pages/parties/components/schema/party.d';

export function PartyEditSheet({ id, formId, onSuccess }: EditSheetProps) {
  const updateMutation = useUpdateParty();

  const {
    data: partyResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(getPartyByIdOptions(id));

  const party = partyResponse?.data;

  const form = useForm<PartyFormValues>({
    resolver: zodResolver(partyFormSchema),
    defaultValues: PARTY_FORM_DEFAULT_VALUES,
  });

  useEffect(() => {
    if (party) {
      form.reset({
        name: party.name,
        kind: party.kind,
        email: party.email || '',
        phone: party.phone || '',
        is_archived: party.is_archived,
      });
    }
  }, [party, form]);

  useSheetDirty(form.formState.isDirty);

  if (isLoading) {
    return <SheetLoadingSkeleton rows={5} />;
  }

  if (isError || !party) {
    return (
      <SheetErrorState
        message={error?.message || 'Failed to load party details'}
        onRetry={() => void refetch()}
      />
    );
  }

  const onSubmit = (values: PartyFormValues) => {
    updateMutation.mutate(
      {
        id,
        data: {
          name: values.name,
          kind: values.kind,
          email: values.email || null,
          phone: values.phone || null,
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
        <SheetFieldGroup title="General Information">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Party Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Party name"
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
            name="kind"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Party Type</FormLabel>
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
                    {PARTY_KIND_OPTIONS.map(option => (
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
        </SheetFieldGroup>

        <SheetFieldGroup title="Contact Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="e.g. contact@example.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="e.g. +1 555-0199"
                      disabled={updateMutation.isPending}
                      value={field.value ?? ''}
                      onChange={field.onChange}
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
                    Archive Party
                  </FormLabel>
                  <FormDescription>
                    Archived parties remain in records but are hidden from
                    active dropdowns.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
