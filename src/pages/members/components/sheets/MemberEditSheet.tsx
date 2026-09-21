import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

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
import { SheetLoadingSkeleton } from '@/components/dashboard/sheet/SheetLoadingSkeleton';
import { SheetFieldGroup } from '@/components/dashboard/sheet/SheetFieldGroup';
import { SheetErrorState } from '@/components/dashboard/sheet/SheetErrorState';
import { useSheetDirty } from '@/components/dashboard/sheet/useSheetDirty';
import { getMemberByIdOptions, useUpdateMember } from '@/hooks/api/member.hook';
import { Input } from '@/components/ui/input/Input';
import type { EditSheetProps } from '@/types/sheet.d';

import { MEMBER_ROLE_OPTIONS } from '@/pages/members/components/schema/member.constants';
import {
  memberEditFormSchema,
  type MemberEditFormValues,
} from '@/pages/members/components/schema/member.schema';

export function MemberEditSheet({ id, formId, onSuccess }: EditSheetProps) {
  const { data, isLoading, isError, refetch } = useQuery(
    getMemberByIdOptions(id),
  );
  const updateMutation = useUpdateMember();

  const member = data?.data;

  const form = useForm<MemberEditFormValues>({
    resolver: zodResolver(memberEditFormSchema),
    defaultValues: {
      role: 'member',
    },
  });

  useEffect(() => {
    if (member) {
      form.reset({
        role: member.role,
      });
    }
  }, [member, form]);

  useSheetDirty(form.formState.isDirty);

  const onSubmit = (values: MemberEditFormValues) => {
    updateMutation.mutate(
      {
        id,
        data: {
          role: values.role,
        },
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      },
    );
  };

  if (isLoading) {
    return <SheetLoadingSkeleton rows={4} />;
  }

  if (isError || !member) {
    return (
      <SheetErrorState
        message="Failed to load member details."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-6 p-6"
      >
        <SheetFieldGroup title="Member Information">
          <div className="flex flex-col gap-4">
            <FormItem>
              <FormLabel>Member Email (Read Only)</FormLabel>
              <FormControl>
                <Input value={member.email} disabled readOnly />
              </FormControl>
            </FormItem>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role & Permissions</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={updateMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEMBER_ROLE_OPTIONS.map(option => (
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
          </div>
        </SheetFieldGroup>
      </form>
    </Form>
  );
}
