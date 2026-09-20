import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { useUpdateParty } from '@/hooks/api/party.hook';

import { PartyKindBadge } from '@/pages/parties/list/components/party-kind-badge/PartyKindBadge';
import { PartyArchiveBadge } from '@/pages/parties/list/components/party-archive-badge/PartyArchiveBadge';
import {
  PARTY_FORM_DEFAULT_VALUES,
  PARTY_KIND_OPTIONS,
} from '@/pages/parties/components/schema/party.constants';
import { partyFormSchema } from '@/pages/parties/components/schema/party.schema';
import type { PartyFormValues } from '@/pages/parties/components/schema/party.d';
import type { PartyBasicTabProps } from './party-basic-tab.d';

export function PartyBasicTab({ party }: PartyBasicTabProps) {
  const updateMutation = useUpdateParty();

  const form = useForm<PartyFormValues>({
    resolver: zodResolver(partyFormSchema),
    defaultValues: {
      ...PARTY_FORM_DEFAULT_VALUES,
      name: party.name,
      kind: party.kind,
      email: party.email || '',
      phone: party.phone || '',
      is_archived: party.is_archived,
    },
  });

  useEffect(() => {
    form.reset({
      name: party.name,
      kind: party.kind,
      email: party.email || '',
      phone: party.phone || '',
      is_archived: party.is_archived,
    });
  }, [party, form]);

  const onSubmit = (values: PartyFormValues) => {
    updateMutation.mutate({
      id: party.id,
      data: {
        name: values.name,
        kind: values.kind,
        email: values.email || null,
        phone: values.phone || null,
        is_archived: values.is_archived,
      },
    });
  };

  const isDirty = form.formState.isDirty;

  const leftContent = (
    <div className="flex flex-col gap-6">
      <DataCard
        title="Party Details"
        description="Update party identification, business relation type, and contact channels."
        action={
          <Button
            size="sm"
            type="submit"
            form="party-details-form"
            disabled={!isDirty || updateMutation.isPending}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} className="mr-1 size-3.5" />
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="party-details-form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Party Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Acme Corp, Jane Doe"
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
                      Archive this party
                    </FormLabel>
                    <p className="text-muted-foreground text-xs">
                      Archived parties remain in records but are hidden from
                      active transaction selectors.
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

  const rightContent = (
    <DataCard
      title="System Information"
      description="Read-only metadata and system audit timestamps."
    >
      <div className="flex flex-col gap-4">
        <DataCardIdField id={party.id} label="Party ID" />

        <div className="flex flex-col gap-3 border-t pt-3">
          <DataCardField
            label="Workspace ID"
            value={party.business_id}
            copyable
          />
          <DataCardPropertyRow
            label="Party Type"
            value={<PartyKindBadge kind={party.kind} />}
          />
          <DataCardPropertyRow
            label="Archive Status"
            value={<PartyArchiveBadge isArchived={party.is_archived} />}
          />
          <DataCardPropertyRow
            label="Email"
            value={
              <span className="text-foreground text-sm font-medium">
                {party.email || 'Not provided'}
              </span>
            }
          />
          <DataCardPropertyRow
            label="Phone"
            value={
              <span className="text-foreground text-sm font-medium">
                {party.phone || 'Not provided'}
              </span>
            }
          />
        </div>

        <DataCardTimestampGroup
          createdAt={party.created_at}
          updatedAt={party.updated_at}
          deletedAt={party.deleted_at}
        />
      </div>
    </DataCard>
  );

  return <SplitLayout left={leftContent} right={rightContent} />;
}
